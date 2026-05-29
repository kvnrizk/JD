import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Clinic } from "@/lib/models";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const clinics = await Clinic.find().sort({ order: 1 });
    return NextResponse.json(clinics);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  if (!await getSession()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await connectDB();
  const data = await req.json();
  const clinic = await Clinic.create(data);
  return NextResponse.json(clinic, { status: 201 });
}
