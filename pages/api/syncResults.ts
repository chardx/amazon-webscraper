import * as admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../firebaseAdmin";

type SyncResponse = {
  status: string;
  count?: number;
  message?: string;
};

type RawProduct = {
  title?: string;
  url?: string;
  price?: number;
  previous_price?: number;
  rating?: string | number;
  reviews?: number;
  image?: string;
  imageset?: string;
  features?: unknown;
  sponsored?: boolean;
};

const titleFromUrl = (url: string) => {
  try {
    const { pathname } = new URL(url);
    const slug = pathname.split("/dp/")[0].replace(/^\/+|\/+$/g, "");
    const decoded = decodeURIComponent(slug).replace(/[-_]+/g, " ").trim();
    return decoded || "Amazon product";
  } catch {
    return "Amazon product";
  }
};

const normalizeProduct = (record: RawProduct) => {
  const url = record.url ?? "";
  const features = Array.isArray(record.features)
    ? record.features.filter(
        (feature): feature is string =>
          typeof feature === "string" && feature.length > 0
      )
    : [];

  return {
    title: record.title?.trim() || titleFromUrl(url),
    url,
    price: typeof record.price === "number" ? record.price : 0,
    previous_price:
      typeof record.previous_price === "number" ? record.previous_price : 0,
    rating: record.rating != null ? String(record.rating) : "",
    reviews: typeof record.reviews === "number" ? record.reviews : 0,
    image: record.image ?? "",
    imageset: record.imageset || record.image || "",
    features,
    sponsored: Boolean(record.sponsored),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = String(req.body?.id || "");
  if (!id) {
    return res.status(400).json({ error: "Missing search id" });
  }

  try {
    const docRef = adminDb.collection("searches").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Search not found" });
    }

    const current = snapshot.data() || {};
    if (current.status === "complete" || current.status === "error") {
      return res.status(200).json({
        status: current.status,
        count: Array.isArray(current.results) ? current.results.length : 0,
      });
    }

    const response = await fetch(
      `https://api.brightdata.com/dca/dataset?id=${encodeURIComponent(id)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        },
      }
    );

    if (response.status === 202) {
      return res.status(200).json({ status: "pending" });
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !Array.isArray(payload)) {
      const message =
        (payload && typeof payload.message === "string" && payload.message) ||
        `Bright Data returned ${response.status} while fetching results`;

      if (response.status >= 500 || response.status === 429) {
        return res.status(200).json({ status: "pending", message });
      }

      await docRef.set(
        {
          status: "error",
          error: message,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.status(200).json({ status: "error", message });
    }

    const results = payload.map((record) =>
      normalizeProduct(record as RawProduct)
    );

    await docRef.set(
      {
        status: "complete",
        results,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.status(200).json({ status: "complete", count: results.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sync failed";
    console.log("SYNC ERROR IS >> ", message);
    return res.status(500).json({ error: message });
  }
}
