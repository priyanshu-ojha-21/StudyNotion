import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <>
      <div className="my-6 sm:my-10 flex flex-col sm:flex-row gap-4 sm:gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-4 sm:p-8 sm:px-12">
        <div className="flex aspect-square h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-pink-700 shrink-0">
          <FiTrash2 className="text-2xl sm:text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-full sm:w-4/5 text-pink-25 text-sm sm:text-base">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300 text-sm sm:text-base"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "Your account will be deleted permanently and all associated data will be lost.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}