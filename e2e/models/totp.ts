import { authenticator } from "otplib";
import dotenv from "dotenv";

dotenv.config();

export function generateTotp(): string {
  const secret = process.env.TOTP_SECRET;
  if (!secret) {
    throw new Error("TOTP_SECRET is not defined in .env");
  }

  return authenticator.generate(secret);
}
