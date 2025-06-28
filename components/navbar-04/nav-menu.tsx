"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavMenuProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export const NavMenu = ({ className, orientation = "horizontal" }: NavMenuProps) => {
  const navigationItems = [
    {
      title: "Features",
      items: [
        {
          title: "Image Conversion",
          description: "Transform any image into detailed ASCII art.",
          href: "#",
        },
        {
          title: "Code Visualization",
          description: "Convert code structures into ASCII diagrams.",
          href: "#",
        },
        {
          title: "Terminal UI",
          description: "Create terminal-friendly text visualizations.",
          href: "#",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          title: "CLI Tool",
          description: "Command-line interface for batch processing.",
          href: "#",
        },
        {
          title: "API Access",
          description: "Integrate ASCII conversion into your apps.",
          href: "#",
        },
        {
          title: "VS Code Extension",
          description: "Convert directly within your editor.",
          href: "#",
        },
      ],
    },
  ]

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col space-y-4", className)}>
        {navigationItems.map((item) => (
          <div key={item.title} className="space-y-2">
            <h4 className="font-medium text-sm text-white font-mono">{item.title}</h4>
            <div className="pl-4 space-y-2">
              {item.items.map((subItem) => (
                <a
                  key={subItem.title}
                  href={subItem.href}
                  className="block text-sm text-white/70 hover:text-white transition-colors font-mono"
                >
                  {subItem.title}
                </a>
              ))}
            </div>
          </div>
        ))}
        <Link href="#" className="text-sm font-medium text-white hover:text-white/70 transition-colors font-mono">
          Documentation
        </Link>
        <Link href="#" className="text-sm font-medium text-white hover:text-white/70 transition-colors font-mono">
          GitHub
        </Link>
      </div>
    )
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className="text-sm font-medium text-white font-mono">{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 bg-black border border-white">
                {item.items.map((subItem) => (
                  <NavigationMenuLink
                    key={subItem.title}
                    href={subItem.href}
                    className={cn(
                      "block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black font-mono",
                    )}
                  >
                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/70">{subItem.description}</p>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link href="#" className="text-sm font-medium text-white hover:text-white/70 transition-colors font-mono flex h-10 items-center px-4 py-2">
            Documentation
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#" className="text-sm font-medium text-white hover:text-white/70 transition-colors font-mono flex h-10 items-center px-4 py-2">
            GitHub
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
