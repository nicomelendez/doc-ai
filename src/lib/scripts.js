export function getRequestBody(fields, data) {
  const responsesArray = []

  data.asks.forEach((item) => {
    const responseKey = `response-${item.id}`
    if (fields[responseKey]) {
      responsesArray.push({
        id: item.id,
        ask: item.ask,
        response: fields[responseKey],
      })
    }
  })

  const requestBody = {
    contextInfo: data.context,
    responses: responsesArray,
  }
  return requestBody
}
