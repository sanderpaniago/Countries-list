import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header', () => {
  it('should render a header element with specific class and styles', () => {
    render(<Header />)

    const headerElement = screen.getByTestId('header-container')

    expect(headerElement).toHaveClass(
      'flex py-8 px-4 w-full border-b border-gray-100 dark:border-gray-700 dark:bg-very-dark-gray'
    )
  })

  it('should render a div element with specific classes and styles', () => {
    render(<Header />)

    const divElement = screen
      .getByTestId('header-container')
      .querySelector('div')

    expect(divElement).toHaveClass(
      'flex items-center justify-between w-full max-w-[1440px] mx-auto'
    )
  })

  it('should render a p element with specific classes and text content', () => {
    render(<Header />)

    const pElement = screen.getByTestId('header-container').querySelector('p')

    expect(pElement).toHaveClass('font-bold text-lg')
    expect(pElement?.textContent).toBe('Where in the world?')
  })
})
