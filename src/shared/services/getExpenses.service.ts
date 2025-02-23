
// Exporto la función de obtener las transacciones
export async function getExpenses() {

  // Realizo una solicitud HTTP GET a la URL de la API para obtener las transacciones
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las transacciones.");
  }
  
   // Si la respuesta es exitosa, convierto el body de la respuesta a JSON y retorno los datos
  const data = await response.json();
  if (!data.token) {
    throw new Error("No se recibió un token");
  }
  return data;
}
