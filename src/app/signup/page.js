"use client";

import FullPageSpinner from "@/components/ui/FullPageSpinner";
import { useUser } from "@/context/userContext";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [Formloading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const {user,setUser,loading} = useUser();
  
  const router = useRouter();

  useEffect(() => {
    function checkUser() {
        if(user){   
            console.log('user exists',user);
            router.push("/"); // redirect if user is found 
        }
        else {
            console.log('no user');
        }
    }
    checkUser();
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    const { fullName, username, email, password } = formData;

    try {
      console.log("Sign Up Data:", formData);
      const res = await registerUser(fullName, username, email, password);
        setUser(res);
      // Optionally redirect or reset form here
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Failed to register. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if(loading) {
    return <FullPageSpinner/>
  }

  if(user) return <FullPageSpinner/>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={Formloading}
          className={`w-full text-white py-2 px-4 rounded-lg transition duration-200 ${
            Formloading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {Formloading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
