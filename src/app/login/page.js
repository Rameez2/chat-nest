"use client";

import { useUser } from "@/context/userContext";
import { loginWithEmailAndPass } from "@/services/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullPageSpinner from "@/components/ui/FullPageSpinner";
import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success,setSuccess] = useState("");

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

    const { email, password } = formData;

    try {
      console.log("Login Data:", formData);
      const res = await loginWithEmailAndPass(email, password);
      setSuccess("Login Success!")
      setUser(res)
      // Optionally redirect or handle successful login
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  if(loading) {
    return <FullPageSpinner/>
  }

  if(user) return <FullPageSpinner/>

  return (
    
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

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
          disabled={formLoading}
          className={`w-full text-white py-2 px-4 rounded-lg transition duration-200 ${
            formLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {formLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
{error && (
  <ErrorToast error={error} setError={setError}/>
)}

{success && (
  <SuccessToast success={success} setSuccess={setSuccess}/>
)}


      </>
  );
};

export default LoginPage;
