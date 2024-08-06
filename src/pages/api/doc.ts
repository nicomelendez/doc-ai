import { type APIRoute } from 'astro'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export const POST: APIRoute = async ({ request }) => {
  try {
    const jsonBody = await request.json()

    if (!jsonBody) return new Response('No body data', { status: 400 })

    console.log(jsonBody)

    const pointers = jsonBody.info.pointers
      ? jsonBody.info.pointers
      : jsonBody.info.analysisResponse.pointers

    console.log(pointers)
    
    const filteredPointers = pointers.filter(
      (point: any) => point && point.title && point.description
    );    

    const docBuffer = await jsonToWord(filteredPointers)

    return new Response(docBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=documento.docx',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

async function jsonToWord(jsonData: any) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: jsonData.map((point: any) => {
          return new Paragraph({
            children: [
              new TextRun({
                text: point.title,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: point.description,
                break: 1,
                size: 20,
              }),
            ],
          })
        }),
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return buffer
}
