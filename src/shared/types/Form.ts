import { FormSchema } from "../schemas/form.schema";
import { ExpenseBlockProps } from "./Expenses";

// Defino las propiedades de las transacciones
export interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (updatedExpense: FormSchema) => void;
    title: string;
    type: "edit" | "delete";
    expense?: ExpenseBlockProps;
}