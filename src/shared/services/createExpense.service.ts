import { FormSchema } from "../schemas/form.schema";

// Exporto la función de crear las transacciones
export async function createExpense(expense: FormSchema) {
     // Realizo una solicitud HTTP POST a la URL de la API para crear la transacción
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(expense),
        }
    );
    // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear expense")
    }

    // Si la respuesta es exitosa, convierto el body de la respuesta a JSON y retorno los datos
    const data = await response.json()

    return data;
}