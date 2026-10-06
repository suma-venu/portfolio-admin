import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";

const API_URL = "https://portfolio-backend-0gym.onrender.com";

function About() {
  const [about, setAbout] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    profile_image: "",
  });

  const token = localStorage.getItem("token");

  const fetchAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/about`);
      setAbout(response.data);
    } catch (error) {
      console.error("Error fetching About:", error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      profile_image: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/about/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/about`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetForm();
      fetchAbout();
    } catch (error) {
      console.error("Error saving About:", error);
      alert(
        error.response?.data?.message ||
          "Failed to save About information"
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      description: item.description || "",
      profile_image: item.profile_image || "",
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
    await axios.delete(`${API_URL}/api/about/${deleteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setShowDeleteModal(false);
    setDeleteId(null);
    fetchAbout();
  } catch (error) {
    console.error("Error deleting About:", error);

    alert(
      error.response?.data?.message ||
        "Failed to delete About information"
    );
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId ? "Edit About" : "Add About"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              name="description"
              placeholder="About Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="5"
              required
            />

            <input
              name="profile_image"
              placeholder="Profile Image URL"
              value={form.profile_image}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update About" : "Add About"}
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

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">
            Existing About Information
          </h2>

          {about.length === 0 ? (
            <p className="text-gray-500">
              No About information found.
            </p>
          ) : (
            <div className="space-y-4">
              {about.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-5"
                >
                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.description}
                  </p>

                  {item.profile_image && (
                    <img
                      src={item.profile_image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-full mt-4"
                    />
                  )}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
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
  title="Delete this About information?"
  message="This action cannot be undone. Are you sure you want to delete this entry?"
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

export default About;