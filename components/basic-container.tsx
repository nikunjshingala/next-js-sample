import Link from 'next/link';
import Breadcrumbs from './atoms/icons';

type ContainerProps = {
  children: React.ReactNode;
  loggedin?: boolean;
  isHamburgerOpen?: boolean;
  toggleHamBurger?: React.MouseEventHandler<HTMLButtonElement>
}
const BasicContainer = (props: ContainerProps) => {
  const {
    loggedin,
    isHamburgerOpen,
    toggleHamBurger,
    children
  } = props
  return (
    <>
      <div className='bg-gray-100'>
        {loggedin ? (
          <div className="flex flex-col lg:flex-row h-screen">
          <div
            className={`bg-gray-800 text-gray-100 px-4 py-8 lg:w-64 ${
              isHamburgerOpen ? 'block' : 'hidden lg:block'
            } `}
          >
            <h1 className="font-bold text-2xl mb-6">Admin Dashboard</h1>
            <ul>
              <li className="mb-4">
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <Link href="/property" className="block text-gray-100 hover:text-gray-300">
                  Properties
                </Link>
              </li>
              <li className="mb-4">
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Users
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="block text-gray-100 hover:text-gray-300">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1 px-4 py-4 lg:px-8 lg:py-4 overflow-scroll">
            <button
              className="block lg:hidden mb-4 bg-gray-800 text-gray-100 px-2 py-1"
              onClick={toggleHamBurger}
            >
              <Breadcrumbs />
            </button>
            {children}
          </div>
        </div>
        ) : props?.children}
      </div>
    </>
  )
}

export default BasicContainer;