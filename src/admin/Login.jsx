import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ADMIN_EMAIL = "sranjay15@gmail.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_FIREBASE_API_KEY
        }`,
        {
            email,
            password,
            returnSecureToken: true,
        }
      );

      // only admin allowed
      if (res.data.email !== ADMIN_EMAIL) {
        alert("You are NOT authorized for the admin panel!");
        return;
      }
      localStorage.setItem("adminToken", res.data.idToken);
      localStorage.setItem("adminEmail", res.data.email);
      navigate("/");
      alert("Login Success")
      window.location.reload();
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
