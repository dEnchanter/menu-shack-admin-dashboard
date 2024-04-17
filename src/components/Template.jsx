'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  ShoppingCartIcon,
  UsersIcon,
  HomeIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"
import { ChevronDownIcon } from 'lucide-react'
import { getInitials } from '@/helper/getInitials'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { 
  //   name: 'Users', 
  //   href: '#', 
  //   icon: UsersIcon,
  //   submenu: [
  //     { name: '- Customer', href: '/users/customer' },
  //     { name: '- Driver', href: '/users/driver' },
  //   ],
  // },
  { name: 'Customer', href: '/customer', icon: UsersIcon },
  { name: 'Restaurants', href: '/restaurant', icon: ShoppingCartIcon },
  { name: 'Drivers', href: '/driver', icon: UsersIcon },
  { name: 'Order History', href: '/order', icon: ChartPieIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Template({ children, title }) {

  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isUsersExpanded, setIsUsersExpanded] = useState(false);
  const [userName, setUserName] = useState(null);

  const pathname = usePathname();

  const toggleUsersSubmenu = () => setIsUsersExpanded(!isUsersExpanded);

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    setUserName(storedUserName);
  }, []);

  const handleLogout = async () => {
    // Optional: Make logout API call

    // Clear user-specific items from localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    
    // Optionally show a notification or toast to the user
    // toast.success('Logged out successfully');

    // Redirect to the login page
    router.replace('/');
  };
    
  const userNavigation = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Sign out', onClick: handleLogout },
  ]

  return (
    <>
      <div>
        {/* Mobile Sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center mt-4">
                      <img
                        className="h-14 w-auto"
                        src="/logo_on_light.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[15rem] lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-6 py-5">
            <div className="flex h-16 items-center">
              <img className="h-14 w-auto" src="/logo_on_light.png" alt="Your Company" />
            </div>
            <nav className="mt-5 flex-1">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    <li>
                      <Link href={item.href} onClick={item.submenu ? (e) => toggleUsersSubmenu(e) : null} className={classNames(
                        "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                        pathname === item.href ? "bg-gray-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
                      )}>
                        <span className="flex items-center">
                          <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                          {item.name}
                        </span>
                        {item.submenu && (
                          <ChevronDownIcon className={`${isUsersExpanded ? 'transform rotate-180' : ''} transition-transform duration-300`} />
                        )}
                      </Link>
                      {item.submenu && (
                        <ul className={`transition-all duration-500 ease-in-out ${isUsersExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden pl-11`}>
                          {item.submenu.map(subItem => (
                            <li key={subItem.name} className="py-1">
                              <Link 
                                href={subItem.href} 
                                className={classNames("block px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50",
                                pathname === subItem.href ? "bg-gray-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
                                )}>
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-[15rem]">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1 ring-transparent" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        {userName}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              onClick={item.onClick ? item.onClick : undefined}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="">
            <MaxWidthWrapper className="px-4 py-10 sm:px-2 lg:px-2 lg:py-[3rem]">
              <Toaster />
              {children}
            </MaxWidthWrapper>
          </main>
        </div>

      </div>
    </>
  )
}
