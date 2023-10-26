'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

type Region = 'Africa' | 'Europe' | 'Oceania' | 'Americas' | 'Asia' | null

export function SortBy() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [region, setRegion] = useState<Region>(
    (searchParams.get('sort') as Region) ?? null
  )

  const options = ['Africa', 'Europe', 'Oceania', 'Americas', 'Asia']

  const sorting = useCallback(
    (opt: string) => {
      const q = searchParams.get('q') ?? ''

      const params: { q?: string; sort: string } = {
        q,
        sort: opt
      }

      if (!q) {
        delete params.q
      }

      const paramsFormat = new URLSearchParams(params)

      setRegion(opt as Region)
      setIsOpen(false)
      push(`/?${paramsFormat}`)
    },
    [searchParams, push]
  )

  return (
    <div className="max-w-[250px]  w-full relative">
      <button
        className="w-full flex items-center justify-between px-6 py-6 rounded-md dark:bg-very-dark-gray"
        onClick={() => setIsOpen((current) => !current)}
        data-testid="button-dropdown"
      >
        <p>{region ?? 'Filter by Region'}</p>
        <IoIosArrowDown size={16} />
      </button>
      {isOpen && (
        <ul className="dark:bg-very-dark-gray absolute top-20 w-full rounded-md p-6 flex flex-col gap-2">
          {options.map((opt) => (
            <li key={opt}>
              <button onClick={() => sorting(opt)}>{opt}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
