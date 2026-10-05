import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ConfirmModal from "./ConfirmModal";

const API_URL = "http://localhost:5000";

function ContentManager({ config }) {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const createEmptyForm = () => {
    const form = {};
    config.fields.forEach((field) => {
      form[field.name] = field.type === "checkbox" ? false : "";
    });
    return form;
  };

  const [form, setForm] = useState(createEmptyForm());

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/${config.endpoint}`
      );
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${config.title}:`, error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [config.endpoint]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/${config.endpoint}/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/${config.endpoint}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      resetForm();
      fetchItems();
    } catch (error) {
      console.error(`Error saving ${config.title}:`, error);

      alert(
        error.response?.data?.message ||
          `Failed to save ${config.title}`
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    const editForm = {};

    config.fields.forEach((field) => {
      editForm[field.name] =
        item[field.name] ??
        (field.type === "checkbox" ? false : "");
    });

    setForm(editForm);

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
      await axios.delete(
        `${API_URL}/api/${config.endpoint}/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowDeleteModal(false);
      setDeleteId(null);

      fetchItems();
    } catch (error) {
      console.error(`Error deleting ${config.title}:`, error);

      alert(
        error.response?.data?.message ||
          `Failed to delete ${config.title}`
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {config.title}
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId
              ? `Edit ${config.singular}`
              : `Add ${config.singular}`}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {config.fields.map((field) => (
              <div key={field.name}>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border rounded-lg p-3"
                    required={field.required}
                  />
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={form[field.name]}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <span>{field.label}</span>
                  </label>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required={field.required}
                  />
                )}

              </div>
            ))}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editingId
                  ? `Update ${config.singular}`
                  : `Add ${config.singular}`}
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

        {/* List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">
            Existing {config.title}
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">
              No {config.title.toLowerCase()} found.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-5"
                >
                  <h3 className="text-lg font-bold">
                    {item[config.displayField]}
                  </h3>

                  {config.secondaryField && (
                    <p className="text-gray-600 mt-1">
                      {item[config.secondaryField]}
                    </p>
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
          title={`Delete this ${config.singular.toLowerCase()}?`}
          message="This action cannot be undone. Are you sure?"
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

export default ContentManager;