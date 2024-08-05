import Toastify from 'toastify-js'

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

export function getToastifyError(texto) {
  Toastify({
    text: texto,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #e3342f, #cc1f1a)',
    },
    onClick: function () {}, // Callback after click
  }).showToast()
}

export function getToastifySuccess(texto) {
  Toastify({
    text: texto,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
    onClick: function () {}, // Callback after click
  }).showToast()
}
