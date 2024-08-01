import React from 'react'
import type { SelectProps } from '@/lib/types'

interface SelectPropsWithSelected extends SelectProps {
  selected: string
}

export const SelectComponent: React.FC<SelectPropsWithSelected> = ({ label, options, selected }) => {
  return (
    <label className='flex items-center w-full'>
      <span className='w-[120px] text-white font-medium'>{label}</span>
      <select name={label.toLowerCase()} className='flex-1 p-2 cursor-pointer rounded-lg' defaultValue={selected}>
        {Object.values(options).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
