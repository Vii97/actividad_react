"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Puedes mostrar un indicador de carga mientras verificas el estado
  // (lo pongo rojo para que se vea va muy rapido)
  if (isAuthenticated === null || isAuthenticated === false) {
    return <div className="h-screen bg-red-500">Loading...</div>;
  }

  return <>{children}</>;
}
