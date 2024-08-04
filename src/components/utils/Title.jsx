import React from 'react'
import '@github/typing-effect-element'

export default function Title() {
  return (
    <h1 className='text-2xl xs:text-3xl md:h-auto text-white font-bold sm:text-4xl leading-relaxed pb-3'>
      <typing-effect data-lines='["Obten un documento inicial en unos clicks"]'>
        <span data-target='typing-effect.content'></span>
        <span data-target='typing-effect.cursor'>|</span>
      </typing-effect>
    </h1>
  )
}
