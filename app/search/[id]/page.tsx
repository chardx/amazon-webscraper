"use client";
import Results from "../../../components/Results";
import { deleteDoc, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import Spinner from "react-spinkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type Props = {
  params: {
    id: string;
  };
};

const SearchPage = ({ params: { id } }: Props) => {
  const [snapshot, loading, error] = useDocument(doc(db, "searches", id));
  const router = useRouter();
  const status = snapshot?.data()?.status as string | undefined;

  useEffect(() => {
    if (!id || (status && status !== "pending")) return;

    let stopped = false;

    const syncResults = async () => {
      if (stopped) return;

      try {
        await fetch("/api/syncResults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
      } catch {
        // Bright Data may still be scraping. The next poll retries.
      }
    };

    syncResults();
    const timer = window.setInterval(syncResults, 10000);

    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [id, status]);

  const handleDelete = () => {
    deleteDoc(doc(db, "searches", id));
    router.push("/");
  };

  const deleteButton = (
    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      onClick={handleDelete}
    >
      Delete Search
    </button>
  );
  if (loading)
    return (
      <h1 className="text-center p-10 animate-pulse text-xl text-indigo-600/500">
        Loading Results...
      </h1>
    );

  if (error)
    return (
      <p className="text-center p-10 text-red-500">
        Couldn&apos;t load this search. {error.message}
      </p>
    );

  if (!snapshot?.exists())
    return (
      <p className="text-center p-10 text-gray-500">
        This search no longer exists.
      </p>
    );

  if (snapshot.data()?.status === "error")
    return (
      <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
        <p className="text-center text-red-500">
          {snapshot.data()?.error || "The scraper could not return results."}
        </p>
        {deleteButton}
      </div>
    );

  if (snapshot.data()?.status === "pending")
    return (
      <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
        <p className="text-indigo-600 animate-pulse text-center">
          Scraping results from Amazon...
        </p>

        <Spinner
          style={{ height: "100px", width: "100px" }}
          name="cube-grid"
          fadeIn="none"
          color="indigo"
        />
        {deleteButton}
      </div>
    );
  return (
    <div className="py-5">
      <div className="flex items-center justify-between mb-7">
        <div className="flex flex-col md:flex-row gap-x-4">
          <h1 className="font-bold">
            Search results for{" "}
            <span className="text-indigo-600">{`"${
              snapshot.data()?.search
            }"`}</span>
          </h1>
          <p className="text-gray-300">
            {`${snapshot.data()?.results?.length || 0} results found`}
          </p>
        </div>
        {deleteButton}
      </div>

      {snapshot.data()?.results?.length > 0 ? (
        <Results results={snapshot.data()?.results} />
      ) : (
        <p className="text-gray-500">No products were returned for this search.</p>
      )}
    </div>
  );
};

export default SearchPage;
