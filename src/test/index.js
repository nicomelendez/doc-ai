import { Document, Packer, Paragraph, TextRun } from 'docx'
import fs from 'fs'

// Función para generar un documento Word
async function jsonToWord(jsonData) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: jsonData.map((point) => {
          return new Paragraph({
            children: [
              new TextRun({
                text: point.title,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: point.descripcion,
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
  fs.writeFileSync('documento.docx', buffer)
  console.log('Document created successfully')
}
const jsonData = [
  {
    id: 1,
    title: 'Introducción a la automatización de trabajos repetitivos',
    descripcion:
      'La evolución de la tecnología ha llevado a la creación de sistemas que pueden realizar tareas rutinarias y predecibles...',
  },
  {
    id: 2,
    title: 'Ventajas de la automatización',
    descripcion:
      'La automatización ha revolucionado la forma en que se realizan las tareas, aumentando la eficiencia y reduciendo costos...',
  },
]

jsonToWord(jsonData)