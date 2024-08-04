import { type APIRoute } from 'astro';
import { analyzeAndExpandInfo } from '@/lib/ai-summary.ts';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const POST: APIRoute = async ({ request }) => {
  try {
    const jsonBody = await request.json();
    if (!jsonBody) return new Response('No body data', { status: 400 });

    const context = await analyzeAndExpandInfo(jsonBody.info.analysisResponse);

    const docBuffer = await jsonToWord(context);

    return new Response(docBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=documento.docx'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Función para generar un documento Word
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
                text: point.descripcion,
                break: 1,
                size: 20,
              }),
            ],
          });
        }),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
