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
        <header className="border-b border-gray-200">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>

              </div>

              <div className="flex items-center gap-4">
                <Button
                  as={Link}
                  color="primary"
                  href="/dashboard/add"
                  variant="solid"
                >
                  Añadir nuevo
                </Button>
              </div>
            </div>
          </div>
        </header>
        {children}
      </ProtectedLayout>
    </>
  );
}
