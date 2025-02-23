import { ExpenseBlockProps } from "../types/Expenses";

// Exporto la función de eliminar las transacciones
export const deleteExpense = async (id: ExpenseBlockProps["id"]) => {
  // Realizo una solicitud HTTP DELETE a la URL de la API para eliminar la transacción
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la transacción");
    }
    // Si la respuesta es exitosa, convierto el body de la respuesta a JSON y retorno los datos
    const data = await response.json();
    if (!data.token) {
      throw new Error("No se recibió un token");
    }
    return data;
  };