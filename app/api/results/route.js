import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Result } from "@/lib/models";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const results = await Result.find().sort({ order: 1 });
    return NextResponse.json(results);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  if (!await getSession()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const result = await Result.create(data);
  return NextResponse.json(result, { status: 201 });
}
