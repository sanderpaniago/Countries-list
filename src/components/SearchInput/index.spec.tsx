import { fireEvent, render, screen } from '@testing-library/react'
import { SearchInput } from '.'

describe('SearchInput', () => {
  it('should render a div element with correct styles', () => {
    render(<SearchInput />)

    const divElement = screen.getByTestId('search-container')
    expect(divElement).toHaveClass(
      'max-w-[1000px] h-fit py-6 flex-1 flex items-center px-6 dark:bg-very-dark-gray rounded-md gap-4'
    )
  })

  it('should render a BiSearchAlt2 icon with correct size', () => {
    render(<SearchInput />)

    const iconElement = screen.getByTestId('search-icon')
    expect(iconElement).toHaveAttribute('width', '24')
  })

  // Renders an input element with a placeholder text of 'Search for a country', no outline, transparent background, and white placeholder text
  it('should render an input element with correct attributes and styles', () => {
    render(<SearchInput />)
    const inputElement = screen.getByTestId('search-input')
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('placeholder', 'Search for a country')
    expect(inputElement).toHaveClass(
      'outline-none flex-1 bg-transparent placeholder:text-white'
    )
  })

  // None found
  it('should not have any additional elements', () => {
    render(<SearchInput />)
    const containerElement = screen.getByTestId('search-container')
    expect(containerElement.children.length).toBe(2)
  })

  // The input element should have a type attribute of 'text'
  it('should have input element with type attribute of "text"', () => {
    render(<SearchInput />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'text')
  })
})
