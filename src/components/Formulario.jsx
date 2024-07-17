"use client"
import React from 'react'

export default function Formulario({ children }) {
 function handlerSumbit(e) {
    e.preventDefault()

    const fields = Object.fromEntries(new window.FormData(e.target))
    
    console.log(fields)
  }
  return (
    <div className='mx-auto mt-8 max-w-xl'>
      <form onSubmit={handlerSumbit} className='flex justify-between items-center'>
        {children}
      </form>
    </div>
  )
}
