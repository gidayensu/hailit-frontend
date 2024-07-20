import { useLogout } from "@/components/Shared/hooks/useLogout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosHelpCircle, IoIosHelpCircleOutline } from "react-icons/io";
import {
  IoDocumentText,
  IoDocumentTextOutline,
  IoLogOut,
  IoLogOutOutline,
  IoShareSocial,
  IoShareSocialOutline,
} from "react-icons/io5";
import {
  MdFeedback,
  MdOutlineFeedback
} from "react-icons/md";
import { PiUserCircle, PiUserCircleFill } from "react-icons/pi";
import {
  RiFileListFill,
  RiFileListLine
} from "react-icons/ri";
import MiddleSectionContainer from "../../Shared/MiddleSectionContainer";
import TopSectionContainer from "../../Shared/TopSectionContainer";
import CustomerHelp from "../Settings/CustomerHelp";
import Feedback from "../Settings/Feedback";
import PrivacyPolicy from "../Settings/PrivacyPolicy";
import ShareHailit from "../Settings/ShareHailit";
import { ProfileDialog } from "./ProfileDialog";
import { ProfileNonDialogItem } from "./ProfileNonDialog";


export default function ProfilePageDetails() {
  const path = usePathname();
  
  const { first_name, email, last_name } = useAppSelector(
    (state) => state.user
  );

  //signOut
  const {handleLogOut} = useLogout();

  const iconsAndTextMainContainerClass =
    "flex flex-col gap-2 md:w-96 md:text-3xl";

  const iconTextClass = "text-sm";
  return (
    <>
      <TopSectionContainer className="justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center">
            <span className="bg-gradient-to-r from-cyan-500 to-primary-color w-16 h-16 rounded-full"></span>
            <p className="absolute z-10 font-bold ">{first_name[0]}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-1 text-white">
              <p className="text-2xl font-semibold">
                {`${first_name} ${last_name}`}
              </p>
              <p className={iconTextClass}>{email}</p>
              <p className={iconTextClass}> </p>
            </div>
          </div>
        </div>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col gap-3 bg-white w-full -mt-20 rounded-tr-[50px] p-5 md:items-center md:justify-center">
        {/* Account section */}
        <h2 className="font-bold text-md"> Account</h2>

        <div className={iconsAndTextMainContainerClass}>
          {!path.startsWith("/dispatcher") && (
            <>
            <Link href={"/profile/all-orders"}>
              <ProfileNonDialogItem
                IconFill={RiFileListFill}
                IconOutline={RiFileListLine}
              >
                <p className="text-sm"> Orders </p>
              </ProfileNonDialogItem>
            </Link>
          <Link href={"/profile/edit-profile"}>
            <ProfileNonDialogItem
              IconFill={PiUserCircleFill}
              IconOutline={PiUserCircle}
            >
              <p className="text-sm"> Edit profile </p>
            </ProfileNonDialogItem>
          </Link>
            </>
          )}


          {/* <ProfileDialog
            IconFill={RiLockPasswordFill}
            IconOutline={RiLockPasswordLine}
            iconText="Change password"
          >
            <ChangePassword />
          </ProfileDialog> */}
          {/* IMPLEMENT SWITCH FROM CUSTOMER TO RIDER */}
          {/* {!path.startsWith("/dispatcher") && (
            <ProfileDialog
              IconFill={MdSportsMotorsports}
              IconOutline={MdOutlineSportsMotorsports}
              iconText="Switch to Rider"
            >
              <ChangePassword />
            </ProfileDialog>
          )} */}

          <ProfileNonDialogItem
            IconFill={IoLogOut}
            IconOutline={IoLogOutOutline}
          >
            <p onClick={handleLogOut} className="text-sm">
              Sign out
            </p>
          </ProfileNonDialogItem>
        </div>

        {/* General Section */}
        <h2 className="font-bold text-md mt-2"> General</h2>

        <div className={iconsAndTextMainContainerClass}>
          <ProfileDialog
            IconFill={IoDocumentText}
            IconOutline={IoDocumentTextOutline}
            iconText="Privacy policy"
          >
            <ScrollArea className="max-h-[500px] max-w-[300px]  rounded-md">
              <PrivacyPolicy />
            </ScrollArea>
          </ProfileDialog>

          <ProfileDialog
            IconFill={MdFeedback}
            IconOutline={MdOutlineFeedback}
            iconText="Send feedback"
          >
            <Feedback />
          </ProfileDialog>

          <ProfileDialog
            IconFill={IoIosHelpCircle}
            IconOutline={IoIosHelpCircleOutline}
            iconText="Help"
          >
            <CustomerHelp />
          </ProfileDialog>

          <ProfileDialog
            IconFill={IoShareSocial}
            IconOutline={IoShareSocialOutline}
            iconText="Share Hailit"
          >
            <ShareHailit />
          </ProfileDialog>
        </div>
      </MiddleSectionContainer>
    </>
  );
}
