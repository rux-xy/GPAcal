import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function Settings() {
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (!user) {
    return (
      <div className="p-6 text-gray-500">
        You must be logged in to view settings.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Card */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-lg">Profile</h2>

        <div className="text-sm">
          <p>
            <span className="text-gray-500">Name:</span>{" "}
            {user.displayName || "Not set"}
          </p>

          <p>
            <span className="text-gray-500">Email:</span> {user.email}
          </p>

          <p>
            <span className="text-gray-500">Auth Provider:</span>{" "}
            {user.providerData[0]?.providerId}
          </p>
        </div>
      </div>

      {/* Account Actions */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-lg">Account</h2>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Placeholder for future settings */}
      <div className="border rounded-lg p-4 text-sm text-gray-500">
        More settings (profile editing, theme, preferences) will be added here.
      </div>
    </div>
  );
}

export default Settings;
