import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    console.log(body)

    return new Response(JSON.stringify({ data: null }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
