import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";

const API_URL = "http://localhost:5000";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "",
  });

  const token = localStorage.getItem("token");

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/skills`);
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      level: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/skills/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/skills`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetForm();
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert(
        error.response?.data?.message ||
          "Failed to save skill"
      );
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 const handleDelete = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${API_URL}/api/skills/${deleteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setShowDeleteModal(false);
    setDeleteId(null);
    fetchSkills();
  } catch (error) {
    console.error("Error deleting skill:", error);

    alert(
      error.response?.data?.message ||
        "Failed to delete skill"
    );
  }
};
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Skills
        </h1>

        {/* Add/Edit Skill */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId ? "Edit Skill" : "Add Skill"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Skill Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              name="category"
              placeholder="Category (Frontend, Backend, Database...)"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="level"
              placeholder="Level (Beginner, Intermediate, Advanced)"
              value={form.level}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update Skill" : "Add Skill"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Skills List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">
            Existing Skills
          </h2>

          {skills.length === 0 ? (
            <p className="text-gray-500">
              No skills found.
            </p>
          ) : (
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {skill.name}
                    </h3>

                    <p className="text-gray-600">
                      {skill.category}
                    </p>

                    <p className="text-sm text-gray-500">
                      Level: {skill.level}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete this skill?"
  message="This action cannot be undone. Are you sure you want to delete this skill?"
  onCancel={() => {
    setShowDeleteModal(false);
    setDeleteId(null);
  }}
  onConfirm={confirmDelete}
/>
      </main>
    </div>
  );
}

export default Skills;