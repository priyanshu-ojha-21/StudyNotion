import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { VscDashboard, VscSignOut, VscSettingsGear } from "react-icons/vsc"
import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { sidebarLinks } from "../../data/dashboard-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { logout } from "../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    if (!route) return false
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Hamburger Icon */}
        <button
          className="mr-2 cursor-pointer md:hidden"
          onClick={() => setOpenMobileMenu((prev) => !prev)}
        >
          {openMobileMenu ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {openMobileMenu && (
        <div className="absolute top-[56px] left-0 z-[1000] flex max-h-[calc(100vh-56px)] w-full flex-col overflow-y-auto border-b border-richblack-700 bg-richblack-800 p-4 md:hidden">
          <ul className="flex flex-col gap-y-3 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-richblack-25">Catalog</p>
                    <div className="my-1 flex flex-col gap-2 border-l border-richblack-700 pl-4">
                      {loading ? (
                        <p className="text-sm text-richblack-300">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={i}
                              onClick={() => setOpenMobileMenu(false)}
                              className="text-sm text-richblack-100 hover:text-yellow-25"
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-sm text-richblack-300">
                          No Courses Found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path || "#"}
                    onClick={() => setOpenMobileMenu(false)}
                  >
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile Dashboard Section Header */}
            {token !== null && (
              <>
                <div className="mt-2 border-t border-richblack-700 pt-3">
                  <p className="mb-2 flex items-center gap-x-2 text-xs font-semibold uppercase tracking-wide text-richblack-400">
                    <VscDashboard />
                    Dashboard
                  </p>
                </div>

                {/* All Sidebar Links (role-based, mirrors desktop Sidebar) */}
                {sidebarLinks.map((link) => {
                  if (link.type && user?.accountType !== link.type) return null
                  const Icon = Icons[link.icon]
                  return (
                    <li key={link.id}>
                      <Link
                        to={link.path}
                        onClick={() => setOpenMobileMenu(false)}
                        className="flex items-center gap-x-2 py-1"
                      >
                        {Icon && <Icon className="text-lg" />}
                        <p
                          className={`${
                            matchRoute(link.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.name}
                        </p>
                      </Link>
                    </li>
                  )
                })}

                {/* Settings */}
                <li>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setOpenMobileMenu(false)}
                    className="flex items-center gap-x-2 py-1 text-richblack-25"
                  >
                    <VscSettingsGear className="text-lg" />
                    <p
                      className={`${
                        matchRoute("/dashboard/settings")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      Settings
                    </p>
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-4 flex flex-col gap-y-3 border-t border-richblack-700 pt-4">
            {token === null ? (
              <div className="flex gap-x-4">
                <Link to="/login" onClick={() => setOpenMobileMenu(false)}>
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setOpenMobileMenu(false)}>
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-3">
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setOpenMobileMenu(false)}
                  className="flex items-center gap-x-3"
                >
                  <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[32px] rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-richblack-5">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-richblack-300">
                      {user?.email}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout(navigate))
                    setOpenMobileMenu(false)
                  }}
                  className="flex items-center gap-x-2 rounded-md border border-pink-700 bg-pink-900/30 px-3 py-2 text-sm font-medium text-pink-200 transition-all duration-200 hover:bg-pink-900/60"
                >
                  <VscSignOut className="text-lg" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;