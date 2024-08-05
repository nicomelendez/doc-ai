import React from 'react'
import '@github/typing-effect-element'

export default function Title() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  return (
    <div className='mx-auto text-center max-w-[630px] lg:max-w-[800px] min-h-[8.5rem] md:min-h-[6rem]'>
      <h1 className='text-2xl xs:text-3xl md:h-auto text-white font-bold sm:text-4xl leading-relaxed pb-3'>
        <typing-effect data-lines='["Obten un documento inicial en unos clicks"]'>
          <span data-target='typing-effect.content'></span>
          <span data-target='typing-effect.cursor'>|</span>
        </typing-effect>
      </h1>
      <p
        className={`text-slate-300 text-sm lg:text-base text-pretty ${
          prefersReducedMotion ? '' : 'animate-fade-in animate-delay-[1.8s] md:animate-delay-[2s]'
        }`}
      >
        Proporciona la información sobre un tema y obtén un documento Word para
        seguir editando.
      </p>
    </div>
  )
}
