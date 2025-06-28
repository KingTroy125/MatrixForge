import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CirclePlay, Terminal, Code, FileCode } from "lucide-react"
import Navbar04 from "../navbar-04/navbar-04"
import Image from "next/image"
import Link from "next/link"

const Hero03 = () => {
  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-4/5 h-4/5 max-w-3xl">
              <Image
                src="/assets/img_2.png" 
                alt="ASCII art face"
                fill
                className="object-contain object-center opacity-30"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <Navbar04 />
      <div className="flex flex-col gap-10 items-center justify-center px-6 py-16 pt-80 relative z-10">
        <div className="text-center max-w-2xl">
          <Badge className="bg-white text-black rounded-full py-1 border-none">
            <Terminal className="h-4 w-4 mr-1" /> Developer Tools
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold !leading-[1.2] tracking-tight text-white font-mono">
            Matrix<span className="text-white">Forge</span>
          </h1>
          <p className="mt-6 text-[17px] md:text-lg text-white font-mono">
            Transform images, code, and text into mesmerizing ASCII art. Create terminal-friendly visualizations
            with our powerful conversion engine built for developers.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/ascii-page">
              <Button
                size="lg"
                className="rounded-full text-base bg-white text-black hover:bg-gray-200 font-mono"
              >
                Try It Now <Code className="!h-5 !w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none border-white text-white hover:bg-white hover:text-black font-mono"
            >
              <FileCode className="!h-5 !w-5" /> Documentation
            </Button>
          </div>
          <div className="mt-12 bg-black/70 p-6 rounded-lg border border-white font-mono text-sm text-white overflow-x-auto text-left">
            <pre>{`
  __  __       _        _      ______                   
 |  \\/  |     | |      (_)    |  ____|                  
 | \\  / | __ _| |_ _ __ ___  _| |__ ___  _ __ __ _  ___ 
 | |\\/| |/ _\` | __| '__| \\ \\/ /  __/ _ \\| '__/ _\` |/ _ \\
 | |  | | (_| | |_| |  | |>  <| | | (_) | | | (_| |  __/
 |_|  |_|\\__,_|\\__|_|  |_/_/\\_\\_|  \\___/|_|  \\__, |\\___|
                                               __/ |     
                                              |___/      
            
  > Transform images into striking ASCII art
  > Visualize code structures in plain text
  > Create terminal-ready UI components
            `}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero03
