import { Header } from '@/components/Header'
import { api } from '@/services/api'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowLeftShort } from 'react-icons/bs'

async function getData(country: string) {
  try {
    const { data: countryData } = await api.get(`/alpha/${country}`, {
      params: {
        fields:
          'capital,region,flags,population,name,subregion,tld,currencies,languages,borders'
      }
    })

    if (!countryData) {
      throw new Error(
        'Country not found, please verify country name and try again!'
      )
    }

    const name = countryData.name.common

    const firstNativeNameOption = Object.values(
      countryData.name.nativeName
    )[0] as {
      common: string
    }
    const nativeName = firstNativeNameOption.common

    const firstCurrencyOption = Object.values(countryData.currencies)[0] as {
      name: string
    }
    const currencyName = firstCurrencyOption.name

    const languages = Object.values(countryData.languages)

    if (!(countryData?.borders && countryData?.borders.length > 0)) {
      return {
        ...countryData,
        name,
        nativeName,
        currencyName,
        languages
      }
    }

    const { data: countriesBorderData } = await api.get('/alpha', {
      params: {
        codes: countryData.borders.join(','),
        fields: 'name'
      }
    })

    const countriesBorderName = countriesBorderData.map(
      (item: any) => item.name.common
    )

    return {
      ...countryData,
      name,
      nativeName,
      currencyName,
      languages,
      countriesBorderName
    }
  } catch (e) {
    console.error(e)
  }
}

export default async function Page({
  params: { country }
}: {
  params: { country: string }
}) {
  const data = await getData(country)

  return (
    <main className="pb-8">
      <Header />

      <div className="max-w-[1440px] mx-auto px-6 mt-6">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit dark:bg-very-dark-gray px-6 py-2 shadow-lg rounded-sm hover:scale-105 transition duration-200"
        >
          <BsArrowLeftShort size={24} />
          Back
        </Link>

        <div className="mt-16 flex flex-col md:flex-row md:items-start">
          <Image
            src={data.flags.svg}
            alt={data.flags.alt}
            height={300}
            width={300}
          />

          <div className="md:ml-10 mt-10 md:mt-0">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="flex flex-col md:flex-row gap-8 md:gap-24 mt-8 items-start">
              <ul className="flex flex-col gap-4">
                <li>
                  <p>
                    <strong>Native Name:</strong> {data.nativeName}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Population:</strong> {data.population}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Region:</strong> {data.region}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Sub Region:</strong> {data.subregion}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Capital:</strong> {data.capital[0]}
                  </p>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <p>
                    <strong>Top Level Domain:</strong> {data.tld}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Currencies:</strong> {data.currencyName}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Languages:</strong> {data.languages.join(', ')}
                  </p>
                </li>
              </ul>
            </div>
            {data?.countriesBorderName && (
              <div className="mt-12 flex flex-col md:flex-row md:items-start gap-4">
                <p className="text-xl w-fit whitespace-nowrap">
                  Border Countries:
                </p>

                <ul className="flex items-center flex-wrap gap-4">
                  {data.countriesBorderName.map((item: string) => (
                    <li
                      key={item}
                      className="dark:bg-very-dark-gray px-4 py-2 rounded-sm shadow-lg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
