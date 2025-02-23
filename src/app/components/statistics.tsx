"use client";

// Importaciones
import { ExpenseBlockProps } from "@/shared/types/Expenses";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// Interfaz (Propiedades) del componente
interface StatisticsProps {
  transactions: ExpenseBlockProps[];
}

// Component StatisticsProps
const Statistics: React.FC<StatisticsProps> = ({ transactions }) => {

  // Declaración de variables locales para ingresos y gastos
  let incomes = 0;
  let expenses = 0;

  // Recorro las transacciones para sumar ingresos y gastos
  transactions.forEach(({ type, amount }) => {
    const value = Number(amount);
    if (!isNaN(value)) {
      if (type === "income") incomes += value;
      else if (type === "expense") expenses += value;
    }
  });
  // Calculo el total de transacciones con la diferencia entre ingresos y gastos
  const total = incomes - expenses;

  // Array de datos para el gráfico de barras
  const data = [
    { name: "Ingresos", value: incomes, color: "#2563eb" }, 
    { name: "Gastos", value: expenses, color: "#d946ef" }, 
    { name: "Total", value: total, color: "#6b21a8" },      
  ];
 // Componente de estadísticas de ingresos, gastos y total final de transacciones, con un gráfico de barras de Recharts
  return (
    <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
      <div className="border p-4 rounded grid gap-4">
        <p className="text-sm text-black">Total Ingresos</p>
        <p className="text-2xl font-medium text-blue-600">{incomes}€</p>

        <p className="text-sm text-black">Total Gastos</p>
        <p className="text-2xl font-medium text-fuchsia-600">{expenses}€</p>

        <p className="text-sm text-black">TOTAL</p>
        <p className="text-2xl font-medium text-purple-900">{total}€</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Gráficos</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Bar key={index} dataKey="value" fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Exporto el componente Statistics
export default Statistics;