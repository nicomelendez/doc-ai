export async function doc(analyze) {
  try {
    const response = await fetch('/api/doc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: analyze }),
    })
    if (!response.ok) {
      return null
    }

    const blob = await response.blob()
    return blob
  } catch (error) {
    return null
  }
}
