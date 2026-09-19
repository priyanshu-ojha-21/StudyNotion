import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-6 text-2xl font-medium text-richblack-5 sm:mb-14 sm:text-3xl">
        My Profile
      </h1>

      {/* Section 1 */}
      <div className="flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] rounded-full object-cover sm:w-[78px]"
          />
          <div className="space-y-1">
            <p className="text-base font-semibold text-richblack-5 sm:text-lg">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs text-richblack-300 sm:text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="self-end sm:self-auto">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* Section 2 */}
      <div className="my-6 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 px-6 sm:my-10 sm:gap-y-10 sm:p-8 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base font-semibold text-richblack-5 sm:text-lg">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="my-6 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 px-6 sm:my-10 sm:gap-y-10 sm:p-8 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base font-semibold text-richblack-5 sm:text-lg">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-5">
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">First Name</p>
            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">Email</p>
            <p className="break-all text-sm font-medium text-richblack-5">{user?.email}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-600 sm:mb-2 sm:text-sm">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}