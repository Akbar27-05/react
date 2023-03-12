import { useContext, useEffect } from "react";
import SkillContext from "../../Context/SkillContext";

export const SkillCreate = () => {
  const { formValues, onChange, storeSkill, errors, setErrors } =
    useContext(SkillContext);

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    <div className="mt-12">
      <form
        onSubmit={storeSkill}
        className="mx-auto max-w-md rounded-sm bg-white p-4 shadow-md"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="black mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="name"
              value={formValues["name"]}
              onChange={onChange}
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900"
            />
            {errors.name && (
              <span className="text-sm text-red-400">{errors.name[0]}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="black mb-2 text-sm font-medium">
              Slug
            </label>
            <input
              name="slug"
              value={formValues["slug"]}
              onChange={onChange}
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900"
            />
            {errors.slug && (
              <span className="text-sm text-red-400">{errors.slug[0]}</span>
            )}
          </div>
        </div>
        <div className="my-4">
          <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700">
            Store
          </button>
        </div>
      </form>
    </div>
  );
};