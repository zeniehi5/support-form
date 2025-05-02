import { z } from "zod";

export const issueTypes = [
  "Bug Report",
  "Feature Request",
  "General Inquiry",
] as const;

export const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  issueType: z.enum(issueTypes, { required_error: "Issue Type is required" }),
  tags: z.array(z.string()).default([]),
  steps: z
    .array(z.object({ step: z.string().min(1, "Step is required") }))
    .min(1, "At least one step is required"),
});

export type FormData = z.infer<typeof schema>;
