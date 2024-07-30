export async function refine(requestBody) {
  try {
    const response = await fetch('/api/refine', {
      // Ajusta la URL según la ruta de tu API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error('Error al procesar el texto.')
    }

    const refinedContext = await response.json()

    return refinedContext
  } catch (error) {
    return null
  }
}
