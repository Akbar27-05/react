import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SkillContext from "../../Context/SkillContext";

export const SkillIndex = () => {
  const { skills, getSkills, deleteSkill } = useContext(SkillContext);
  useEffect(() => {
    getSkills();
  }, []);
  return (
    <div className="mt-12">
      <div className="m-2 flex justify-end p-2">
        <Link
          to="/skills/create"
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
        >
          New Skill
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => {
              return (
                <tr
                  key={skill.id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{skill.name}</td>
                  <td className="px-6 py-4">{skill.slug}</td>
                  <td className="space-x-2 px-6 py-4">
                    <Link
                      to={`/skills/${skill.id}/edit`}
                      className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};