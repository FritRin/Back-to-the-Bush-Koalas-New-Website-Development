import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // temporary login
    localStorage.setItem("loggedIn", "true");

    console.log(email, password);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2">
        Admin Login
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Sign in to access the admin panel
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FA659]"
            placeholder="admin@email.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FA659]"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="
            w-full
            bg-[#9FA659]
            hover:bg-[#7E844B]
            text-white
            font-semibold
            py-3
            rounded-lg
            transition
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login