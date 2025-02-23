"use client";

// Importaciones
import { Modal, ModalContent, ModalBody, ModalHeader, Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { ModalComponentProps } from "@/shared/types/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "@/shared/schemas/form.schema";
import { Controller, useForm } from "react-hook-form";
import { updateExpense } from "@/shared/services/updateExpenses.service";
import { useRouter } from "next/navigation";
import { toast } from "nextjs-toast-notify";

// Component ModalComponentProps
const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm, title, expense }) => {

    // Declaro constantes
    const router = useRouter();
    const expenseId = expense?.id;

    // Configuro el formulario con React Hook Form y Zod
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: expense?.amount || 0,
            type: expense?.type || "expense",
            description: expense?.description || "",
        }
    });

    // Envío del form
    const onSubmit = async (dataExpense: FormSchema) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/");
            return;
        }
        
        // Actualizo la transacción uan vez es editada
        try {
            if (dataExpense && expenseId) {
                const updatedExpense = { ...dataExpense };
                console.log("Operación actualizada:", updatedExpense);
                const result = await updateExpense(updatedExpense, expenseId);
                onConfirm(result);  
                onClose();
                toast.success("¡Guardado!", {
                    duration: 4000,
                    position: "top-center",
                    transition: "bounceIn",
                });
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error("Error al guardar la transacción", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
            });
        }
    };
    // Modal para editar una transacción. Uso Controller para manejar componentes de entrada
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="mx-auto items-center justify-center bg-purple-800 bg-opacity-100">
            <ModalContent className="bg-white rounded-lg w-full max-w-xl mx-4 p-6">
                <ModalHeader className="text-xl font-bold text-black mx-auto">{title}</ModalHeader>
                <ModalBody className="w-full mx-auto p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                type="number"
                                autoFocus
                                label="Cantidad"
                                placeholder="0"
                                isInvalid={!!errors.amount}
                                errorMessage={errors.amount?.message}
                                value={(field.value !== undefined ? String(Math.round(field.value)) : "0")}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                onBlur={(e) => field.onChange(Number(e.target.value))}
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
                                    selectedKeys={field.value ? [field.value] : []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    isInvalid={!!errors.type}
                                    errorMessage={errors.type?.message}
                                >
                                    <SelectItem key="income" value="income">
                                        Ingreso
                                    </SelectItem>
                                    <SelectItem key="expense" value="expense">
                                        Gasto
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
                        <div className="flex justify-center space-x-4 pt-6">
                            <Button
                                onPress={onClose}
                                className="px-6 py-2 text-white rounded-lg bg-fuchsia-500 hover:bg-fuchsia-700">
                                Cancelar
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                isLoading={isSubmitting}
                                className={`px-6 py-2 rounded-lg focus:outline-none  bg-indigo-500 hover:bg-indigo-700`}>
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;