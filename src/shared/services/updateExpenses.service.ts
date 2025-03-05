import { FormSchema } from "../schemas/form.schema";

// Exporto la función de actualizar las transacciones
export async function updateExpense(expense: FormSchema, id: number) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se recibió un token");
  }

  // Realizo una solicitud HTTP PUT a la URL de la API para actualizar la transacción
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(expense),
  });

  // Si la respuesta no es exitosa, obtengo los datos de error y lanzo un error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la transacción");
  }

  // Si la respuesta es exitosa, convierto el body de la respuesta a JSON y retorno los datos
  const data = await response.json();
  return data;
}