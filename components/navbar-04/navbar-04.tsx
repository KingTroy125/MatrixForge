"use client"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import Link from "next/link"
import { Code, Terminal } from "lucide-react"

const Navbar04 = () => {
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-black/80 backdrop-blur-md border border-white max-w-screen-xl mx-auto rounded-full z-50">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full border-white text-white hover:bg-white hover:text-black font-mono"
          >
            <Terminal className="mr-2 h-4 w-4" />
            API Docs
          </Button>
          <Link href="/converter">
            <Button className="rounded-full bg-white text-black hover:bg-white hover:opacity-90 font-mono">
              <Code className="mr-2 h-4 w-4" />
              Try It Now
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar04