import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }
  const token = await signToken({ sub: user._id.toString(), email: user.email });
  const res = NextResponse.json({ email: user.email, name: user.name, role: user.role });
  res.cookies.set("access_token", token, {
    httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 12, path: "/",
  });
  return res;
}
