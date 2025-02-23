"use client";

// Importaciones
import {
  Button,
  Input,
  Select,
  Textarea,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { formSchema, FormSchema } from "@/shared/schemas/form.schema";
import { createExpense } from "@/shared/services/createExpense.service";
import { toast } from "nextjs-toast-notify";
 
// Component para añadir nuevas transacciones
export default function AddExpenses() {
  const router = useRouter();
  // Formulario React Hook Form y Zod
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      type: undefined,
      description: "",
    },
  });
  // Envío del form
  const onSubmit = async (dataExpense: FormSchema) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      toast.error("Tu sesión ha expirado. Vuelve a iniciar sesión.", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
      return;
    }

    try {
      // Para crear nuevas transacciones
      const responseData = await createExpense(dataExpense);
      if (responseData) {
        console.log(responseData)
        reset();
        router.push("/dashboard");
        toast.success("¡Transacción creada!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: '',
          sound: true,
        });
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("Error al crear la transacción", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
    }
  };
// Campos (fields) para Cantidad (amount), Ingreso/Gasto (type), Descripción, enviar formulario
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Añadir operación</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              label="Cantidad"
              placeholder="0"
              isInvalid={!!errors.amount}
              errorMessage={errors.amount?.message}
              value={field.value !== undefined ? String(field.value) : ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value < 0 ? 0 : value);
              }}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Tipo"
              placeholder="Tipo de operación"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0] as string;
                field.onChange(selectedValue);
              }}
              isInvalid={!!errors.type}
              errorMessage={errors.type?.message}
            >
              <SelectItem key="expense" value="expense">
                Gasto
              </SelectItem>
              <SelectItem key="income" value="income">
                Ingreso
              </SelectItem>
            </Select>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Descripción"
              placeholder="Describe la operación"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" isLoading={isSubmitting} className="w-full bg-sky-300">
          Guardar
        </Button>
      </form>
    </div>
  );
}