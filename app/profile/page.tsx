"use client";

//next and react

import Link from "next/link";

//ui + icons

import { FiChevronRight } from "react-icons/fi";
import { AiFillSecurityScan, AiOutlineSecurityScan } from "react-icons/ai";
import {
  MdFeedback,
  MdOutlineFeedback,
  MdOutlineDarkMode,
  MdDarkMode,
  MdLightMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { IoIosHelpCircle, IoIosHelpCircleOutline } from "react-icons/io";
import {
  IoDocumentText,
  IoDocumentTextOutline,
  IoLogOut,
  IoLogOutOutline,
  IoShareSocialOutline,
  IoShareSocial,
} from "react-icons/io5";
import { PiUserCircle, PiUserCircleFill } from "react-icons/pi";
//main components

import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";

export default function Profile() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopContent className="justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full"></span>
              <p className="absolute z-10 font-bold ">JA</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-1 text-white">
                <h2 className="text-2xl font-semibold">Jamila Arthur</h2>
                <p className="text-sm">jamila@arthur@gmail.com</p>
                <p className="text-sm">0546879845</p>
              </div>
            </div>
          </div>
        </TopContent>

        <MidContent className="flex flex-col gap-3 bg-white w-full -mt-20 rounded-tr-[50px] p-5">
          <h2 className="font-bold text-md"> Account</h2>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <PiUserCircle className="text-2xl group-hover:opacity-0" />
                <PiUserCircleFill className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm">Edit profile</p>
              </span>
              <FiChevronRight className=" group-hover:text-slate-50" />
            </div>

            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <AiOutlineSecurityScan className="text-2xl group-hover:opacity-0" />
                <AiFillSecurityScan className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Security and login </p>
              </span>
              <FiChevronRight />
            </div>
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <MdOutlineDarkMode className="text-2xl group-hover:opacity-0" />
                <MdDarkMode className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Dark mode </p>
              </span>
              <FiChevronRight />
            </div>

            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <IoLogOutOutline className="text-2xl group-hover:opacity-0" />
                <IoLogOut className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Sign out </p>
              </span>
              <FiChevronRight />
            </div>
          </div>
          <h2 className="font-bold text-md mt-2"> General</h2>
          <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <IoDocumentTextOutline className="text-2xl group-hover:opacity-0" />
                <IoDocumentText className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Privacy policy </p>
              </span>
              <FiChevronRight />
            </div>
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <MdOutlineFeedback className="text-2xl group-hover:opacity-0" />
                <MdFeedback className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Send feedback </p>
              </span>
              <FiChevronRight />
            </div>
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <IoIosHelpCircleOutline className="text-2xl group-hover:opacity-0" />
                <IoIosHelpCircle className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Help Center </p>
              </span>
              <FiChevronRight />
            </div>
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md">
              <span className="flex items-center justify-center gap-2 relative">
                <IoShareSocialOutline className="text-2xl group-hover:opacity-0" />
                <IoShareSocial className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
                <p className="text-sm"> Share Hailit </p>
              </span>
              <FiChevronRight />
            </div>
          </div>
        </MidContent>
      </main>
    </>
  );
}
