'use client'

// Importaciones
import { ExpenseBlockProps } from "@/shared/types/Expenses";
import { useEffect, useState } from "react";
import { getExpenses } from "@/shared/services/getExpenses.service";
import ExpenseBlock from "@/app/components/expense-block";
import Statistics from "@/app/components/statistics";

// Definición del componente Dashboard (página principal)
export default function Dashboard() {
  // Declaración de constantes usando UseState para manejar sus estados
  const [expenses, setExpenses] = useState<ExpenseBlockProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook de efecto para obtener las transacciones
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const resultData = await getExpenses();
        setExpenses(resultData);
      } catch (error) {
        console.error("Error al obtener gastos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  // Función para actualizar una transacción
  const updateExpense = (updatedExpense: ExpenseBlockProps) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  // Función para eliminar una transacción del estado
  const deleteExpense = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Devuelvo transacciones y estadísticas
  return (
    <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5max-w-screen-xl px-6">
      {loading ? (
        <p className="text-center text-sky-700 mt-6">Cargando...</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 py-8">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <ExpenseBlock
                  key={expense.id}
                  {...expense}
                  onEdit={updateExpense}
                  onDelete={deleteExpense}
                />
              ))
            ) : (
              <p className="text-center text-sky-700">No hay transacciones.</p>
            )}
          </div>

          <div className="mt-12">
            <Statistics transactions={expenses} />
          </div>
        </>
      )}
    </div>
  );
}
