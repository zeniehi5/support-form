import formReducer, {
  submitForm,
  initialState,
  SupportFormData,
} from "../formSlice";

describe("formSlice", () => {
  it("should return submitted form as state", () => {
    const mockData: SupportFormData = {
      fullName: "Jinah Jang",
      email: "zeniehi5@example.com",
      issueType: "Feature Request",
      tags: ["UI", "Backend"],
      steps: [{ step: "Click something" }],
    };

    const state = formReducer(initialState, submitForm(mockData));

    expect(state).toEqual(mockData);
  });
});
