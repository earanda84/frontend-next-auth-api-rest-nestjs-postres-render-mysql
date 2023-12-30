"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface CatType {
  id: number;
  age: number;
  breed: {
    id: number;
    name: string;
  };
  name: string;
  userEmail: string;
}

const Dashboard = () => {
  const [cats, setCats] = useState([]);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Traer a los gatos con usuario autenticado
  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    setCats(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button
        type="button"
        onClick={getCats}
        className="px-6 py-2 bg-blue-600 text-white rounded font-normal"
      >
        GET CATS
      </button>
      {cats.map((cat: CatType) => (
        <div key={cat.id}>
          <p>{cat.name}</p>
          <p>{cat.age}</p>
          <p>{cat.breed.name}</p>
          <p>{cat.userEmail}</p>
        </div>
      ))}
    </div>
  );
};
export default Dashboard;
