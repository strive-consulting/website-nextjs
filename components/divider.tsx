interface DividerProps {
  halfPadding?: boolean
}

export function Divider({ halfPadding }: DividerProps) {

  const padding = halfPadding ? 'py-3 mt-3 md:py-5 md:mt-10' : 'py-6 mt-6 md:py-10 md:mt-20'
  return <div className={`${padding} border-t border-gray-800`}></div>
}
