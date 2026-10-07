import type { Locale } from "@/i18n/routing";
import en from "./en";
import ru from "./ru";

export const messages: Record<Locale, typeof en> = { en, ru };
