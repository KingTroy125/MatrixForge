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
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img_1 (1).png"
          alt="Binary code background"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      <Navbar04 />
      <div className="flex flex-col gap-6 sm:gap-10 items-center justify-center px-4 sm:px-6 py-16 pt-32 sm:pt-40 md:pt-80 relative z-10">
        <div className="text-center max-w-2xl w-full">
          <Badge className="bg-white text-black rounded-full py-1 px-3 border-none text-xs sm:text-sm">
            <Terminal className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Developer Tools
          </Badge>
          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold !leading-[1.1] sm:!leading-[1.2] tracking-tight text-white font-mono">
            Matrix<span className="text-white">Forge</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white font-mono leading-relaxed px-2">
            Transform images, code, and text into mesmerizing ASCII art. Create terminal-friendly visualizations
            with our powerful conversion engine built for developers.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link href="/converter" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-sm sm:text-base bg-white text-black hover:bg-gray-200 font-mono px-6 py-3"
              >
                Try It Now <Code className="!h-4 !w-4 sm:!h-5 sm:!w-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-sm sm:text-base shadow-none border-white text-white hover:bg-white hover:text-black font-mono px-6 py-3"
            >
              <FileCode className="!h-4 !w-4 sm:!h-5 sm:!w-5 mr-2" /> Documentation
            </Button>
          </div>
          <div className="mt-8 sm:mt-12 bg-black/70 p-4 sm:p-6 rounded-lg border border-white font-mono text-xs sm:text-sm text-white overflow-x-auto text-left mx-2 sm:mx-0">
            <pre className="whitespace-pre-wrap break-all sm:break-normal">{`
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