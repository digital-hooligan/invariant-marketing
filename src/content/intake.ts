/** Intake paths. Both land on /contact with the matching form selected. */
export const INQUIRY_TYPES = ["teaming", "project"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const TEAMING_INTAKE_HREF = "/contact?type=teaming";
export const PROJECT_INTAKE_HREF = "/contact?type=project";

/** Direct fallback when the form can't deliver. */
export const DIRECT_CONTACT_EMAIL = "hello@digitalhooligan.io";
