"use client";
import { toast } from "nextjs-toast-notify";
import { authSchema, AuthSchema } from "@/shared/schemas/auth.schema";
import { loginService } from "@/shared/services/login.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
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
      const responseData = await loginService(dataForm);

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        router.push("/dashboard");
      } else {
        throw new Error("No se recibió un token");
      }
    } catch (error) {
      console.log(error);
      toast.success("¡Has iniciado sesión!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
      alert(error);
    }
  };

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5">
      <div className="mx-auto max-w-lg text-center">

        <h2 className="font-bold mt-6">Iniciar sesión</h2>
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
          <p className="text-sm text-fuchsia-700">
            No tienes cuenta?
            <Link className="underline" href="/register">
              Regístrate
            </Link>
          </p>

          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" type="submit" isLoading={isSubmitting}>
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}
