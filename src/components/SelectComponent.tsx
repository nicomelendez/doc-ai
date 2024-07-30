import type { SelectProps } from '@/lib/types'

export const SelectComponent: React.FC<SelectProps> = ({ label, options }) => {
  return (
    <label className='flex w-full'>
      <span className='w-[120px] text-white font-medium'>{label}</span>
      <select name={label.toLowerCase()} className='flex-1'>
        {Object.values(options).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
