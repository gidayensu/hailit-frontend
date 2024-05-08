"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ThemeToggle() {
  
  const { setTheme, systemTheme, theme } = useTheme();
  const userTheme = ()=> {
      if (systemTheme === 'dark' || theme === 'dark') {
        setTheme("light")
        
      }

      if(systemTheme === 'light' || theme === 'light') {
        setTheme("dark")
        
      }
       
  }

  return (

       
        <Button size="icon" variant='empty' onClick={userTheme} className="flex justify-center items-center absolute border-none  bg-inherit w-full ">
          <MoonIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
          <SunIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        

  )
}
