import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Result } from "@/lib/models";
import { getSession } from "@/lib/auth";

export async function PUT(req, { params }) {
  if (!await getSession()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const result = await Result.findByIdAndUpdate(id, data, { new: true });
  if (!result) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  if (!await getSession()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  await Result.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
