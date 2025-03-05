import React, { useState } from "react";
import { useRouter } from "next/router";
import { ExpenseBlockProps } from "@/shared/types/Expenses";
import { updateExpense } from "@/shared/services/updateExpenses.service";

const EditExpense: React.FC = () => {
  const router = useRouter();
  const { id, amount, type, description } = router.query;
  const [formData, setFormData] = useState<ExpenseBlockProps>({
    id: Number(id),
    amount: Number(amount),
    type: type as "income" | "expense",
    description: description as string,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateExpense(formData, formData.id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Monto</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="type">Tipo</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default EditExpense;