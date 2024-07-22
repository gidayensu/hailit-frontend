"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetTheme } from "../Dashboard/Nav/hooks/useSetTheme";
import { ThemeToggle } from "../Theme/ThemeToggle";



export function DispatcherTopNav() {
  const {theme, systemTheme} = useSetTheme()
  
  
  const path = usePathname();

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  const iconTextClass = "text-sm cursor-pointer ";

  const divClass = "flex flex-col justify-center items-center";

  return (
    
    <nav className={`hidden   left-0 right-0 top-auto z-40 ${path.startsWith('/dashboard') ? 'hidden': 'md:flex justify-center'}  items-center p-4 h-20 shadow-md gap-10 w-full bg-white dark:bg-primary-dark font-bold`}>
      {path !== '/dashboard' && (
        <>
      <Link href="/dispatcher">
        <div className={divClass}>
          <Button
            variant={path === "/dispatcher" ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Home
          </Button>
        </div>
      </Link>

      <Link href="/dispatcher/trips">
        <div className={divClass}>
          <Button
            variant={path.startsWith("/order") ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Deliveries
          </Button>
        </div>
      </Link>

      <Link href="/dispatcher/profile">
        
        <div className={divClass}>
          <Button
            variant={path.startsWith("/dispatcher/profile") ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Profile
          </Button>
        </div>
      </Link>
      <div className={iconsAndTextDivClass} >
        <span className={iconsAndTextSpanClass}>
          <ThemeToggle> 

          <p className={iconTextClass}>
            {theme === "light" || (systemTheme === "light" && theme === "system") ? "Dark mode" : "Light mode"}
          </p>
          </ThemeToggle>
        </span>
      </div>
      </>)
      
}  
        </nav>
  );
}
