import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitForm } from "./formSlice";
import { schema, FormData, issueTypes, tagOptions } from "./formSchema";
import { z } from "zod";

export default function SupportForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      issueType: "Bug Report",
      tags: [],
      steps: [{ step: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(submitForm(data));
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full mx-4 p-8 space-y-8 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Support Request Form
          </h2>
          <p className="mt-2 text-gray-600">
            please fill out the form below to submit your support request :)
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message || "Please enter a valid email address"}
            </p>
          )}
        </div>

        {/* Issue Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Issue Type
          </label>
          <select
            {...register("issueType")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.issueType && (
            <p className="text-sm text-red-500">{errors.issueType.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-3">
            {tagOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <input
                  type="checkbox"
                  value={tag}
                  {...register("tags")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Steps to Reproduce */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Steps to Reproduce
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <span className="text-gray-500 font-medium">{index + 1}.</span>
              <input
                {...register(`steps.${index}.step`)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={`Step ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ step: "" })}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Step
          </button>
          {errors.steps && (
            <p className="text-sm text-red-500">
              {errors.steps.message || "At least one step is required"}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
