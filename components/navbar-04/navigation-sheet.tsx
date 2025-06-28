"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "./logo"
import Link from "next/link"

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="border-white text-white">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-l border-white">
        <div className="py-6">
          <Logo />
        </div>
        <div className="flex flex-col gap-6">
          <Link href="#features" className="text-white text-lg">Features</Link>
          <Link href="#tools" className="text-white text-lg">Tools</Link>
          <Link href="#docs" className="text-white text-lg">Documentation</Link>
          <Link href="#github" className="text-white text-lg">GitHub</Link>
          <Link href="/ascii-page">
            <Button className="w-full mt-4 bg-white text-black hover:bg-white/90">
              Try MatrixForge
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
