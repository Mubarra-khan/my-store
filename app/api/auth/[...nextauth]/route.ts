// app/api/auth/[...nextauth]/route.ts
export async function GET() {
  return Response.json({ message: "Auth API is working" });
}

export async function POST() {
  return Response.json({ message: "Auth API is working" });
}