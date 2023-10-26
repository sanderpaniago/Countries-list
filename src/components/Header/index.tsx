import { IoIosMoon } from 'react-icons/io'

export function Header() {
  return (
    <header
      data-testid="header-container"
      className="flex py-8 px-4 w-full border-b border-gray-100 dark:border-gray-700 dark:bg-very-dark-gray "
    >
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <p className="font-bold text-lg">Where in the world?</p>

        <button className="flex items-center gap-4">
          <IoIosMoon size={24} />
          Dark Mode
        </button>
      </div>
    </header>
  )
}
