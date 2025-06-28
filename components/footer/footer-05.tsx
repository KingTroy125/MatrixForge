import { Separator } from "@/components/ui/separator"
import { GithubIcon, TwitterIcon, CodeIcon, Terminal, Code, FileCode } from "lucide-react"
import Link from "next/link"

const footerLinks = [
	{
		title: "Documentation",
		href: "#",
	},
	{
		title: "API",
		href: "#",
	},
	{
		title: "CLI Tools",
		href: "#",
	},
	{
		title: "GitHub",
		href: "#",
	},
	{
		title: "Examples",
		href: "#",
	},
	{
		title: "Privacy",
		href: "#",
	},
]

const Footer05 = () => {
	return (
		<footer className="bg-black border-t border-white">
			<div className="max-w-screen-xl mx-auto">
				<div className="py-12 flex flex-col justify-start items-center">
					{/* ASCII Logo */}
					<pre className="text-white font-mono text-sm sm:text-base">{`
 __  __       _        _      ______              
|  \/  |     | |      (_)    |  ____|             
| \  / | __ _| |_ _ __ ___  _| |__ ___  _ __ __ _ 
| |\/| |/ _\` | __| '__| \ \/ /  __/ _ \| '__/ _\` |
| |  | | (_| | |_| |  | |>  <| | | (_) | | | (_| |
|_|  |_|\__,_|\__|_|  |_/_/\_\_|  \___/|_|  \__, |
                                            __/ | 
                                           |___/  
`}</pre>

					<ul className="mt-6 flex items-center gap-4 flex-wrap">
						{footerLinks.map(({ title, href }) => (
							<li key={title}>
								<Link
									href={href}
									className="text-white hover:text-white font-mono font-medium transition-colors border-b border-transparent hover:border-white"
								>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<Separator className="bg-white" />
				<div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
					{/* Copyright */}
					<div className="flex flex-col sm:flex-row items-center gap-2">
						<span className="text-white font-mono">
							&copy; {new Date().getFullYear()} {" "}
							<Link
								href="/"
								target="_blank"
								className="hover:text-white transition-colors border-b border-transparent hover:border-white"
							>
								MatrixForge
							</Link>
							. All rights reserved.
						</span>
						<span className="text-white font-mono">
							Built with{" "}
							<Link
								href="https://bolt.new"
								target="_blank"
								className="hover:text-white transition-colors border-b border-transparent hover:border-white"
							>
								Bolt.new
							</Link>
						</span>
					</div>

					<div className="flex items-center gap-5 text-white">
						<Link
							href="#"
							target="_blank"
							className="hover:text-white transition-colors"
						>
							<Terminal className="h-5 w-5" />
						</Link>
						<Link
							href="#"
							target="_blank"
							className="hover:text-white transition-colors"
						>
							<Code className="h-5 w-5" />
						</Link>
						<Link
							href="#"
							target="_blank"
							className="hover:text-white transition-colors"
						>
							<FileCode className="h-5 w-5" />
						</Link>
						<Link
							href="#"
							target="_blank"
							className="hover:text-white transition-colors"
						>
							<GithubIcon className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer05
