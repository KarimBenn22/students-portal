import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/api/auth/index.auth";

export const authClient = createAuthClient({
  baseURL: process.env.VERCEL_URL || "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      ar: string;
    }
  >
>;

const ErrorCodes = {
  USER_NOT_FOUND: {
    en: "User not found",
    ar: "المستخدم غير موجود",
  },
  FAILED_TO_CREATE_USER: {
    en: "Failed to create user",
    ar: "فشل في إنشاء المستخدم",
  },
  FAILED_TO_CREATE_SESSION: {
    en: "Failed to create session",
    ar: "فشل في إنشاء الجلسة",
  },
  FAILED_TO_UPDATE_USER: {
    en: "Failed to update user",
    ar: "فشل في تحديث المستخدم",
  },
  FAILED_TO_GET_SESSION: {
    en: "Failed to get session",
    ar: "فشل في الحصول على الجلسة",
  },
  INVALID_PASSWORD: {
    en: "Invalid password",
    ar: "كلمة المرور غير صحيحة",
  },
  INVALID_EMAIL: {
    en: "Invalid email",
    ar: "البريد الإلكتروني غير صحيح",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "Invalid email or password",
    ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: "Social account already linked",
    ar: "الحساب الاجتماعي مرتبط بالفعل",
  },
  PROVIDER_NOT_FOUND: {
    en: "Provider not found",
    ar: "المزود غير موجود",
  },
  INVALID_TOKEN: {
    en: "Invalid token",
    ar: "رمز غير صالح",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: "ID token not supported",
    ar: "رمز التعريف غير مدعوم",
  },
  FAILED_TO_GET_USER_INFO: {
    en: "Failed to get user info",
    ar: "فشل في الحصول على معلومات المستخدم",
  },
  USER_EMAIL_NOT_FOUND: {
    en: "User email not found",
    ar: "البريد الإلكتروني للمستخدم غير موجود",
  },
  EMAIL_NOT_VERIFIED: {
    en: "Email not verified",
    ar: "البريد الإلكتروني غير مفعل",
  },
  PASSWORD_TOO_SHORT: {
    en: "Password too short",
    ar: "كلمة المرور قصيرة جدًا",
  },
  PASSWORD_TOO_LONG: {
    en: "Password too long",
    ar: "كلمة المرور طويلة جدًا",
  },
  USER_ALREADY_EXISTS: {
    en: "User already registered",
    ar: "المستخدم مسجل بالفعل",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: "Email cannot be updated",
    ar: "لا يمكن تحديث البريد الإلكتروني",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: "Credential account not found",
    ar: "حساب الاعتماد غير موجود",
  },
  SESSION_EXPIRED: {
    en: "Session expired",
    ar: "انتهت صلاحية الجلسة",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: "Failed to unlink last account",
    ar: "فشل في إلغاء ربط الحساب الأخير",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found",
    ar: "الحساب غير موجود",
  },
} satisfies ErrorTypes;

export const getAuthErrorMessage = (code: string, lang: "en" | "ar") => {
  if (code in ErrorCodes) {
    return ErrorCodes[code as keyof typeof ErrorCodes][lang];
  }
  return "";
};
