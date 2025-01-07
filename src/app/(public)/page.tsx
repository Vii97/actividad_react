"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Gestión de ingresos y gastos
        </h1>
        <h2 className="font-bold mt-6">Iniciar sesión</h2>
      </div>

      <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <Input label="Email" type="email" variant="bordered" />
        <Input label="Contraseña" type="password" variant="bordered" />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No tienes cuenta?
            <Link className="underline" href="/register">
              Registrate
            </Link>
          </p>

          <Button color="primary">Iniciar sesión</Button>
        </div>
      </form>
    </div>
  );
}
