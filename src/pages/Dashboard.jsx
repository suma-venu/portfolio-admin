import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome to your Portfolio CMS Admin Panel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Projects</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Blogs</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Skills</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;