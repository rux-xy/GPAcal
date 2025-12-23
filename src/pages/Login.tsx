import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleGoogle() {
    await loginWithGoogle();
    navigate("/");
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* Left */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold">Login to your account</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-400">or</div>

          <button
            onClick={handleGoogle}
            className="w-full border py-2 rounded flex items-center justify-center gap-2"
          >
            <img src="/google.svg" className="h-4" />
            Login with Google
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right placeholder */}
      <div className="bg-gray-100" />
    </div>
  );
}
