export async function POST(req: Request) {}

export async function GET(req: Request) {
  return new Response("Hello, Chad!", {
    status: 200,
  });
}
