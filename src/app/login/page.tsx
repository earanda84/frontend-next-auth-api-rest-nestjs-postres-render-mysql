"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("Kzv7593r.");
  const router = useRouter();

  // Este metodo toma el formulario personalizado y realiza las validaciones de singIn de NextAuth, las cuales ya están definidas en el route.ts de la api auth
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="p-5">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border mx-auto md:max-w-xl gap-3 px-10 py-16 mt-32 rounded-lg shadow-lg shadow-gray-600
        "
      >
        <input
          type="email"
          placeholder="test@test.com"
          name="email"
          className="border rounded mb-2 p-2 outline-indigo-500"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="123123"
          name="password"
          className="border rounded mb-2 p-2 outline-indigo-500"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </button>
        {errors.length > 0 && (
          <div className="bg-red-200 text-indigo-700 mt-5 py-5 px-10 rounded-md">
            <ul className="mb-0 list-disc">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
export default LoginPage;
