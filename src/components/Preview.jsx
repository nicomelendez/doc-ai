import React from 'react'
import useStore from '@/lib/useStore.ts'

export default function Preview() {
  const analysisResponse = useStore((state) => state.analysisResponse)

  if (analysisResponse == null || !analysisResponse.analysisResponse) {
    return <>Algo malo salio</>
  }

  console.log(analysisResponse)
  const data = JSON.parse(analysisResponse.analysisResponse)

  console.log(data)

  async function downloadMarkdown() {
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ info: data }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const markdown = await response.json();
      console.log(markdown)
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documento.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download the document:', error);
    }
  }
  return (
    <section>
      <h2 className='text-xl text-white font-bold sm:text-2xl leading-relaxed py-8 text-center'>
        Preview del documento
      </h2>
      <button
        onClick={downloadMarkdown}
        className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
      >
        Descargar
      </button>
      {data.pointers.map((item) => {
        if (item.ask !== '') {
          return (
            <div className='text-white mb-5' key={item.id}>
              <p className='pb-1 font-medium'>{item.title}</p>
              <p>{item.descripcion}</p>
            </div>
          )
        }
      })}
      {data.bibliography != null ? (
        <div>
          <p className='pb-1 font-medium text-white'>Bibliografia</p>
          {data.bibliography.map((item, i) => {
            return (
              <div className='text-white mb-5' key={i}>
                <p className='pb-1 font-medium'>{item.title}</p>
                <p>{item.url}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </section>
  )
}
