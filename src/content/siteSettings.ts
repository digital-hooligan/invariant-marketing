import fs from "node:fs";
import { settingsPath } from "./paths";
import { SiteSettingsSchema } from "./schema";

export type SiteSettings = ReturnType<typeof SiteSettingsSchema.parse>;

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(settingsPath, "utf-8");
  const json = JSON.parse(raw) as unknown;
  return SiteSettingsSchema.parse(json);
}
