export async function analyze(refinedContext) {
  try {
    const responseAnalized = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: refinedContext }),
    })

    const data = await responseAnalized.json()

    return data
  } catch (error) {
    console.error('Error posting to API:', error)
  }
}
