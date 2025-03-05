'use client'

// Importaciones
import { ExpenseBlockProps } from "@/shared/types/Expenses";
import { useEffect, useState } from "react";
import { getExpenses } from "@/shared/services/getExpenses.service";
import { updateExpense } from "@/shared/services/updateExpenses.service";
import ExpenseBlock from "@/app/components/expense-block";
import Statistics from "@/app/components/statistics";

// Definición del componente Dashboard (página principal)
export default function Dashboard() {
  // Declaración de constantes usando UseState para manejar sus estados
  const [expenses, setExpenses] = useState<ExpenseBlockProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<ExpenseBlockProps | null>(null);

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
  const handleUpdateExpense = async (updatedExpense: ExpenseBlockProps) => {
    try {
      await updateExpense(updatedExpense, updatedExpense.id);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
      setEditingExpense(null);
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
    }
  };

  // Función para eliminar una transacción del estado
  const deleteExpense = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Función para manejar la edición de un gasto
  const handleEditClick = (expense: ExpenseBlockProps) => {
    setEditingExpense(expense);
  };

  // Devuelvo transacciones y estadísticas
  return (
    <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5 px-6">
      {loading ? (
        <p className="text-center text-sky-700 mt-6">Cargando...</p>
      ) : (
        <>
          {editingExpense ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateExpense(editingExpense);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-black">Monto</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={editingExpense.amount}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      amount: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
              <label htmlFor="type" className="block text-sm font-medium text-black">Tipo</label>
              <select
                id="type"
                name="type"
                value={editingExpense.type}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    type: e.target.value as "income" | "expense",
                  })
                }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="income">Ingreso</option>
                  <option value="expense">Gasto</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">Descripción</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editingExpense.description}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Guardar cambios
                </button>
                <button type="button" onClick={() => setEditingExpense(null)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-col gap-4 py-8">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <ExpenseBlock
                      key={expense.id}
                      {...expense}
                      onDelete={deleteExpense}
                      onEdit={handleEditClick}
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
        </>
      )}
    </div>
  );
}