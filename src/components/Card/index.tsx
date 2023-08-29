import Image from 'next/image'
import Link from 'next/link'

type Props = {
  imageUrl: string
  imageAlt: string
  name: string
  population: number
  region: string
  capital: string
  code: string
}

export function Card({
  capital,
  imageAlt,
  imageUrl,
  name,
  population,
  region,
  code
}: Props) {
  return (
    <Link
      href={`/${code}`}
      className="min-w-[300px] max-w-[300px] bg-white dark:bg-very-dark-gray rounded-b-md"
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={300}
        height={200}
        className="rounded-t-md h-[200px] w-[300px] object-cover"
      />
      <div className="p-4 ">
        <h3 className="font-bold">{name}</h3>

        <p className="mt-4 font-light">
          <strong className="font-medium">Population: </strong> {population}
        </p>
        <p className="my-1">
          <strong className="font-medium">Region: </strong> {region}
        </p>
        <p>
          <strong className="font-medium">Capital: </strong> {capital}
        </p>
      </div>
    </Link>
  )
}
