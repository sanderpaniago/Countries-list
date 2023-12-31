import { BiSearchAlt2 } from 'react-icons/bi'

export function SearchInput() {
  return (
    <div
      data-testid="search-container"
      className="max-w-[1000px] h-fit py-6 flex-1 flex items-center px-6  dark:bg-very-dark-gray rounded-md gap-4"
    >
      <BiSearchAlt2 data-testid="search-icon" size={24} />
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search for a country"
        className="outline-none flex-1 bg-transparent placeholder:text-white"
      />
    </div>
  )
}
