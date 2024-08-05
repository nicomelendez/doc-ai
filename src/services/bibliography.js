export async function bibliography(pointers) {
  try {
    const responseAnalized = await fetch('/api/bibliography', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: pointers }),
    })

    const data = await responseAnalized.json()

    return data
  } catch (error) {
    console.error('Error posting to API:', error)
  }
}
