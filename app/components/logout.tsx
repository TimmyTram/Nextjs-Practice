"use client";

import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevents redirect after logout
    // Optionally, you can add any additional logic here, like displaying a message
  };

  if (!session) return null; // Don't render the button if not authenticated

  return (
    <button
      onClick={handleLogout}
      className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
