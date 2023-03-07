import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const search = req.body.search;
}

// export async function GET(req: Request) {
//   return new Response("Hello, Chad!", {
//     status: 200,
//   });
// }
