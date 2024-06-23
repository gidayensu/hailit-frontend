import Lottie from "lottie-react";

import { FiCheck } from "react-icons/fi";

export type SelectedUserRole = {
    customer: boolean;
    dispatcher: boolean;
  };

export type UserRole = "customer" | "dispatcher";

export default function UserOption ({selectedUserRole, selectedUserRoleHandler, animation, userRole}: {selectedUserRole: boolean, selectedUserRoleHandler: (userRole: UserRole)=>void, animation: any, userRole: UserRole}) {
    return (
        <div
                    onClick={() => selectedUserRoleHandler(userRole)}
                    className={`flex flex-col items-center w-full h-52 rounded-xl shadow-sm  hover:bg-primary-color cursor-pointer ${
                      selectedUserRole ? "bg-primary-color" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full h-44 rounded-xl border border-primary-color bg-white dark:bg-secondary-dark object-contain">
                      <Lottie
                        animationData={animation}
                        className="w-52 object-contain  md:w-52"
                      />
                    </div>
                    <span
                      className={`flex items-center justify-center -mt-4  border border-secondary-color h-8 w-8 rounded-full   ${
                        selectedUserRole
                          ? "bg-secondary-color text-white"
                          : "text-secondary-color bg-white "
                      }`}
                    >
                      <FiCheck className={`${!selectedUserRole && 'hidden'}`} />
                    </span>
                  </div>
    )
}