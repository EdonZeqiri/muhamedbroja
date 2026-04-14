"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ose fjalëkalimi nuk është i saktë.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-layout-bg px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="font-headings text-2xl font-medium">Hyr në panel</h1>
            <p className="text-sm text-secondary mt-2">muhamedbroja.com</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-secondary"
                placeholder="admin@muhamedbroja.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Fjalëkalimi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white text-sm font-medium py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Duke hyrë..." : "Hyr"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
