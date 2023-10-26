import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SortBy } from '.'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null
    }
  },
  useSearchParams() {
    return {
      get: () => null
    }
  }
}))

describe('SortBy', () => {
  it('should toggle visibility of region options when button is clicked', () => {
    render(<SortBy />)

    const button = screen.getByTestId('button-dropdown')
    waitFor(() => {
      const options = screen.getByRole('list')

      fireEvent.click(button)

      expect(options).toBeVisible()
      fireEvent.click(button)

      expect(options).not.toBeVisible()
    })
  })

  it('should update URL query parameter and displayed region when a region option is clicked', () => {
    render(<SortBy />)

    const button = screen.getByTestId('button-dropdown')

    waitFor(() => {
      const option = screen.getByText('Africa')

      fireEvent.click(button)
      fireEvent.click(option)

      expect(window.location.search).toBe('?sort=Africa')
      expect(screen.getByText('Africa')).toBeInTheDocument()
    })
  })

  it('should update URL query parameter and displayed region when a region option with existing query parameter is clicked', () => {
    render(<SortBy />)

    const button = screen.getByTestId('button-dropdown')
    waitFor(() => {
      fireEvent.click(button)

      const option = screen.getByText('Africa')

      fireEvent.click(option)

      expect(window.location.search).toBe('?sort=Africa')
      expect(screen.getByText('Africa')).toBeInTheDocument()
    })
  })

  it("should display null region when there is no 'sort' query parameter in the URL", () => {
    render(<SortBy />)

    expect(screen.getByText('Filter by Region')).toBeInTheDocument()
  })

  it("should display null region when the 'sort' query parameter in the URL is not a valid region", () => {
    render(<SortBy />)

    expect(screen.getByText('Filter by Region')).toBeInTheDocument()
  })

  it("should display null region when the 'sort' query parameter in the URL is an empty string", () => {
    render(<SortBy />)

    expect(screen.getByText('Filter by Region')).toBeInTheDocument()
  })
})
