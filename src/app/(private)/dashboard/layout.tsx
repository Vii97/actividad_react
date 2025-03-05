"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import ProtectedLayout from "./protected-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedLayout>
        <header className="p-10">
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard" passHref><p className="text-white">Inicio</p></Link>
                <Link href="/dashboard/add" passHref>
                  <Button color="primary" variant="solid">
                    Añadir nuevo
                  </Button>
                </Link>
              </div>
        </header>
        {children}
      </ProtectedLayout>
    </>
  );
}
