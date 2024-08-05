export async function consult(info) {
  try {
    const response = await fetch('/api/consult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: info }),
    })

    const reader = response.body?.getReader()

    return reader
  } catch (error) {
    console.error('Error posting to API:', error)
  }
}
