import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Twitter } from "lucide-react"
import type { ComponentProps } from "react"

const TwitterLogo = Twitter;

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Backend Developer",
    company: "CodeStack",
    testimonial:
      "MatrixForge has been invaluable for my documentation work. Being able to quickly generate ASCII diagrams of our architecture saved me countless hours.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    designation: "Open Source Contributor",
    company: "GitHub",
    testimonial: "I use MatrixForge for all my README files now. The CLI integration is seamless and lets me automate ASCII art generation in my build pipeline.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Jamie Taylor",
    designation: "DevOps Engineer",
    company: "CloudSystems",
    testimonial:
      "Our terminal-based monitoring dashboards look amazing thanks to MatrixForge. Being able to visualize complex data in ASCII format that works across any SSH connection is game-changing.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "Raj Patel",
    designation: "Technical Writer",
    company: "DocuTech",
    testimonial: "I create all our code documentation with MatrixForge. The ability to convert code snippets into ASCII flowcharts helps our team understand complex processes.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Emma Wilson",
    designation: "Game Developer",
    company: "PixelForge",
    testimonial: "We use MatrixForge for creating text-based UI elements in our retro-style games. The customization options are perfect for our needs.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 6,
    name: "Omar Hassan",
    designation: "Security Analyst",
    company: "SecureNet",
    testimonial: "This tool helps us create clean, monospaced output for our security reports. The format converter in MatrixForge is especially useful for our terminal-based tooling.",
    avatar: "/placeholder-user.jpg",
  },
]

const Testimonial02 = () => (
  <div className="min-h-screen flex justify-center items-center py-12 px-6 bg-black">
    <div>
      <h2 className="mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight text-white font-mono">Developer Feedback</h2>
      <div className="max-w-screen-xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mb-8 rounded-none p-6 break-inside-avoid bg-black border border-white transition-all duration-300 hover:bg-white hover:text-black group font-mono"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="text-xl font-medium bg-white text-black group-hover:bg-black group-hover:text-white rounded-none">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-white group-hover:text-black">{testimonial.name}</p>
                  <p className="text-sm text-white group-hover:text-black">{testimonial.designation}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-white hover:text-black group-hover:hover:bg-black group-hover:hover:text-white rounded-none"
              >
                <Link href="#" target="_blank">
                  <TwitterLogo className="w-4 h-4 text-white group-hover:text-black" />
                </Link>
              </Button>
            </div>
            <p className="text-[17px] leading-relaxed text-white group-hover:text-black">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Testimonial02
