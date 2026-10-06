import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";

const API_URL = "https://portfolio-backend-0gym.onrender.com";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    technologies: "",
    project_url: "",
    github_url: "",
  });

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/projects/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/projects`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setForm({
        title: "",
        description: "",
        image_url: "",
        technologies: "",
        project_url: "",
        github_url: "",
      });

      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(error.response?.data?.message || "Failed to save project");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      image_url: project.image_url || "",
      technologies: project.technologies || "",
      project_url: project.project_url || "",
      github_url: project.github_url || "",
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
    await axios.delete(`${API_URL}/api/projects/${deleteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setShowDeleteModal(false);
    setDeleteId(null);
    fetchProjects();
  } catch (error) {
    console.error("Error deleting project:", error);

    alert(
      error.response?.data?.message ||
        "Failed to delete project"
    );
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Projects
        </h1>

        {/* Project Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId ? "Edit Project" : "Add Project"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
            />

            <input
              name="image_url"
              placeholder="Image URL"
              value={form.image_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="technologies"
              placeholder="Technologies (React, Node.js, PostgreSQL)"
              value={form.technologies}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="project_url"
              placeholder="Project URL"
              value={form.project_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="github_url"
              placeholder="GitHub URL"
              value={form.github_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update Project" : "Add Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      description: "",
                      image_url: "",
                      technologies: "",
                      project_url: "",
                      github_url: "",
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Project List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">
            Existing Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-500">
              No projects found.
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-5"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        {project.description}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {project.technologies}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete this project?"
  message="This action cannot be undone. Are you sure you want to delete this project?"
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

export default Projects;