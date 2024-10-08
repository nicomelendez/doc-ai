export async function expand(analyze) {
  try {
    const response = await fetch('/api/expand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: analyze }),
    })
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}
