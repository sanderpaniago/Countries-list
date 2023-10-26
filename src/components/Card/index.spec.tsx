import { Card, Props } from '.'
import { render } from '@testing-library/react'

describe('Card', () => {
  it('should render a card with the given props', () => {
    const props: Props = {
      imageUrl: '/image-url',
      imageAlt: 'image-alt',
      name: 'country-name',
      population: 1000000,
      region: 'country-region',
      capital: 'country-capital',
      code: 'country-code'
    }

    const { getByText, getByAltText } = render(<Card {...props} />)

    expect(getByText(props.name)).toBeInTheDocument()
    expect(getByText(props.population.toString())).toBeInTheDocument()
    expect(getByText(props.region)).toBeInTheDocument()
    expect(getByText(props.capital)).toBeInTheDocument()
    expect(getByAltText(props.imageAlt)).toBeInTheDocument()
    expect(getByAltText(props.imageAlt)).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimage-url&w=640&q=75'
    )
  })

  it('should display the country name, population, region, and capital', () => {
    const props: Props = {
      imageUrl: '/image-url',
      imageAlt: 'image-alt',
      name: 'country-name',
      population: 1000000,
      region: 'country-region',
      capital: 'country-capital',
      code: 'country-code'
    }

    const { getByText } = render(<Card {...props} />)

    expect(getByText(props.name)).toBeInTheDocument()
    expect(getByText(props.population.toString())).toBeInTheDocument()
    expect(getByText(props.region)).toBeInTheDocument()
    expect(getByText(props.capital)).toBeInTheDocument()
  })

  it('should display the country flag image', () => {
    const props: Props = {
      imageUrl: '/image-url',
      imageAlt: 'image-alt',
      name: 'country-name',
      population: 1000000,
      region: 'country-region',
      capital: 'country-capital',
      code: 'country-code'
    }

    const { getByAltText } = render(<Card {...props} />)

    expect(getByAltText(props.imageAlt)).toBeInTheDocument()
    expect(getByAltText(props.imageAlt)).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimage-url&w=640&q=75'
    )
  })

  it('should display the country flag image with empty src when imageUrl is not provided', () => {
    const props: Props = {
      imageUrl: '',
      imageAlt: 'image-alt',
      name: 'country-name',
      population: 1000000,
      region: 'country-region',
      capital: 'country-capital',
      code: 'country-code'
    }

    const { getByAltText } = render(<Card {...props} />)

    expect(getByAltText(props.imageAlt)).toBeInTheDocument()
    expect(getByAltText(props.imageAlt)).toHaveAttribute('src', '')
  })
})
