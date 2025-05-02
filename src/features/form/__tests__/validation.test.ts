import { schema } from "../formSchema";

describe("form validation schema", () => {
  it("should pass with valid data", () => {
    const result = schema.safeParse({
      fullName: "Jinah Jang",
      email: "zeniehi5@example.com",
      issueType: "Bug Report",
      tags: ["UI"],
      steps: [{ step: "Click the button" }],
    });

    expect(result.success).toBe(true);
  });

  it("should fail if fullName is empty", () => {
    const result = schema.safeParse({
      fullName: "",
      email: "zeniehi5@example.com",
      issueType: "Bug Report",
      tags: ["UI"],
      steps: [{ step: "Click the button" }],
    });

    expect(result.success).toBe(false);
  });

  it("should fail if email is invalid", () => {
    const result = schema.safeParse({
      fullName: "Jinah Jang",
      email: "invalid-email",
      issueType: "Bug Report",
      tags: ["UI"],
      steps: [{ step: "Click the button" }],
    });

    expect(result.success).toBe(false);
  });

  it("should fail if no steps are provided", () => {
    const result = schema.safeParse({
      fullName: "Jinah Jang",
      email: "zeniehi5@example.com",
      issueType: "Bug Report",
      tags: ["UI"],
      steps: [],
    });

    expect(result.success).toBe(false);
  });
});
