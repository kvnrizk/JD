import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Clinic, Result, Instagram, User } from "@/lib/models";

// GET /api/seed — run once after deploy to populate initial data
export async function GET() {
  try {
  await connectDB();

  // Admin user
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({ email, password_hash: bcrypt.hashSync(password, 10), name: "Admin", role: "admin" });
    }
  }

  // Clinics
  if (await Clinic.countDocuments() === 0) {
    await Clinic.insertMany([
      { name: "Cabinet Dentaire de la Madeleine", city: "Madeleine", address: "8 Boulevard de la Madeleine, 75009 Paris", phone: "+33 1 47 42 00 00", doctolib_url: "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas", map_url: "https://www.google.com/maps?q=8+Boulevard+de+la+Madeleine+75009+Paris&output=embed", order: 0 },
      { name: "SELARL JD Reuilly Dentaire", city: "Reuilly", address: "44 Boulevard de Reuilly, 75012 Paris", phone: "+33 1 43 43 00 00", doctolib_url: "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas", map_url: "https://www.google.com/maps?q=44+Boulevard+de+Reuilly+75012+Paris&output=embed", order: 1 },
    ]);
  }

  // Instagram
  if (await Instagram.countDocuments() === 0) {
    const seeds = [
      ["https://images.unsplash.com/photo-1625447521754-764d517239e6?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "Architecture & précision · Cabinet de la Madeleine"],
      ["https://images.unsplash.com/photo-1606811971618-4486d14f3f99?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "Sourire sculpté · alignement parfait"],
      ["https://images.pexels.com/photos/17187918/pexels-photo-17187918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "Discrétion absolue, exigence totale"],
      ["https://images.pexels.com/photos/8672787/pexels-photo-8672787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "Cabinet de Reuilly · suite privée"],
      ["https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "Sourire · une approche sur-mesure"],
      ["https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "Technologies invisibles de pointe"],
      ["https://images.unsplash.com/photo-1776935359455-94263068537c?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "L'orthodontie réinventée pour les esthètes"],
      ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=srgb&fm=jpg&w=900&q=85", "L'art du sourire"],
    ];
    await Instagram.insertMany(seeds.map(([image_url, caption], i) => ({ image_url, caption, link: "https://www.instagram.com/drjosephdardas/", order: i })));
  }

  // Results
  if (await Result.countDocuments() === 0) {
    await Result.insertMany([
      { patient_label: "Patient · Cas 01", treatment_type: "Invisalign", before_url: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?crop=entropy&cs=srgb&fm=jpg&w=1400&q=90", after_url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?crop=entropy&cs=srgb&fm=jpg&w=1400&q=90", date: "2025-09", order: 0 },
      { patient_label: "Patient · Cas 02", treatment_type: "Attaches Linguales", before_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=srgb&fm=jpg&w=1400&q=90", after_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=srgb&fm=jpg&w=1400&q=90", date: "2025-11", order: 1 },
      { patient_label: "Patient · Cas 03", treatment_type: "Alignement d'excellence", before_url: "https://images.pexels.com/photos/17187918/pexels-photo-17187918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1400", after_url: "https://images.pexels.com/photos/8672787/pexels-photo-8672787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1400", date: "2026-01", order: 2 },
    ]);
  }

  return NextResponse.json({ ok: true, message: "Données initialisées" });
  } catch (err) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
