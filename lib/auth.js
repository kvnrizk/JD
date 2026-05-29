import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("12h")
    .sign(await secret());
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, await secret());
  return payload;
}

export async function getSession() {
  const store = await cookies();
  const token = store.get("access_token")?.value;
  if (!token) return null;
  try { return await verifyToken(token); }
  catch { return null; }
}
