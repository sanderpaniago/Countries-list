import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { SortBy } from '@/components/SortBy'
import { api } from '@/services/api'
import Image from 'next/image'

type CountryItem = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: string
  capital: string[]
  region: string
  population: number
}

type Props = {
  searchParams: {
    sort?: string
    q?: string
  }
}

async function getData({q, sort}: Props['searchParams']) {
  const {data} = await api.get('/all', {params: {fields: 'capital,region,flags,population,name'}})
  
  if (!data) {
    throw new Error('Failed to fetch data')
  }

  let country = data.map((item: any) => ({
    ...item,
    name: item.name.common
  })) as CountryItem[]

  if (q) {
    country = country.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
  }

  if (sort) {
    country = country.filter(item => item.region === sort)
  }

  return country.sort((a, b) => a.name.localeCompare(b.name))
}

export default async function Home({searchParams}: Props) {
  console.log(searchParams)
  const data = await getData(searchParams)
  return (
    <main className="pb-6">
      <Header />

      <section className='mt-4 flex flex-col md:justify-between md:flex-row w-full max-w-[1440px] px-4 gap-4 mx-auto'>
        <SearchInput />

        <SortBy />
      </section>

      <ul className='mx-auto w-full flex flex-col items-center md:grid md:grid-cols-grid-cards md:justify-between mt-10 gap-6 max-w-[1440px] px-4'>
        {data.map(item => (
          <li key={item.name} className='w-fit'>
            <Card capital={item.capital[0]} imageUrl={item.flags.svg} imageAlt={item.flags.alt} name={item.name} population={item.population} region={item.region} />
        </li>
          ))}
      </ul>
    </main>
  )
}
