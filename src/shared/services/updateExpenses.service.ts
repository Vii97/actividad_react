import { FormSchema } from "../schemas/form.schema";

// Exporto la función de actualizar las transacciones
export async function updateExpense(expense: FormSchema, id: number) {
  // Realizo una solicitud HTTP PUT a la URL de la API para actualizar la transacción
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(expense),
  });
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la transacción");
  }

  // Si la respuesta es exitosa, convierto el body de la respuesta a JSON y retorno los datos
  const data = await response.json()
  if (!data.token) {
    throw new Error("No se recibió un token");
  }
  return data;
}