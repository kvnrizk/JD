import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Instagram } from "@/lib/models";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const posts = await Instagram.find().sort({ order: 1 });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  if (!await getSession()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const post = await Instagram.create(data);
  return NextResponse.json(post, { status: 201 });
}
