"use client";

import ExpenseBlock from "@/app/components/expense-block";
import { ExpenseBlockProps } from "@/shared/types/Expenses";
import { useEffect, useMemo, useState } from "react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<ExpenseBlockProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        // Por ahora, usamos datos mockeados
        // Con la API, reemplaza esto con el fetch real
        const mockData: ExpenseBlockProps[] = [
          {
            id: 1,
            amount: 500,
            type: "income",
            description: "Salario",
          },
          {
            id: 2,
            amount: 100,
            type: "expense",
            description: "Comida",
          },
          {
            id: 3,
            amount: 100,
            type: "expense",
            description: "Comida",
          },
        ];

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setExpenses(mockData);
      } catch (err) {
        setError("Error al cargar los gastos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Calcular el total usando useMemo
  const total = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      return expense.type === "income"
        ? acc + expense.amount
        : acc - expense.amount;
    }, 0);
  }, [expenses]); // Solo recalcula si expenses cambia

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6">
        <p>Cargando gastos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6">
      <article className="mt-8 flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
        <div>
          <p className="text-sm text-gray-500">Total ingresos menos gastos</p>
          <p className="text-2xl font-medium text-gray-900">
            {total.toFixed(2)}€
          </p>
        </div>
      </article>

      <div className="flex flex-col gap-4 py-8">
        {expenses.map((expense) => (
          <ExpenseBlock key={expense.id} {...expense} />
        ))}
      </div>
    </div>
  );
}
