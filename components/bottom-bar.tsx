"use client"

import { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { LuFileBox, LuHome, LuUser, LuPlus } from "react-icons/lu";

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


type Theme = string;

export function BottomBar() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const { setTheme } = useTheme();
  const theme = ()=> {
      if (currentTheme === 'system' || currentTheme === 'dark') {
        setTheme("light")
        setCurrentTheme("light")
      }

      if(currentTheme === 'light') {
        setTheme("dark")
        setCurrentTheme("dark")
      }
       
  }

  return (
    <div className="flex justify-center items-center p-4 bottom-0 h-20 border-2 border-slate-500 gap-5">
    
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon" onClick={theme} className="border-none">
          <LuHome className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuHome className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm">
          Home
        </p>
        </div>
      
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" onClick={theme} className="border-none">
          <LuFileBox className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuFileBox className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm">
          Orders
        </p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon" onClick={theme} className="border-none">
          <LuPlus className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuPlus className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm">
          New Delivery
        </p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon" onClick={theme} className="border-none">
          <LuUser className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuUser className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm">
          Account
        </p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon" onClick={theme} className="border-none">
          <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm">
          Theme
        </p>
        </div>
    </div>
  )
}
