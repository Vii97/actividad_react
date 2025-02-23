"use client"

import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { toast } from "nextjs-toast-notify";
import { authSchema, AuthSchema } from "@/shared/schemas/auth.schema";
import { registerService } from "@/shared/services/register.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (dataForm: AuthSchema) => {
    try {
      const responseData = await registerService(dataForm);

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        router.push("/dashboard");
        toast.success("¡Registro exitoso!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: '',
          sound: true,
        });
      } else {
        throw new Error("No se recibió un token");
      }
    } catch (err) {
      console.log(err);
      toast.error("Ocurrió un error al registrarse. Inténtalo de nuevo.", {
        duration: 4000,
        position: "top-center",
        transition: "bounceIn",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5">
      <div className="mx-auto max-w-lg text-center">

        <h2 className="font-bold mt-6">Registro</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <Input
          label="Email"
          type="email"
          variant="bordered"
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
        <Input
          label="Contraseña"
          type="password"
          variant="bordered"
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-indigo-500">
            ¿Ya tienes cuenta?
            <Link className="underline" href="/">
              Iniciar sesión
            </Link>
          </p>
          <Button color="secondary" type="submit" isLoading={isSubmitting}>
            Registrarse
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}

// Se ha usado Nextjs Toast Notify https://www.nextjstoastnotify.com/