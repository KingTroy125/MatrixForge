import { Terminal, Code, FileCode, RefreshCw, Eye, Brackets } from "lucide-react"

const features = [
	{
		icon: Code,
		title: "ASCII Generator",
		description:
			"Transform code, text or images into ASCII art with custom character mappings.",
	},
	{
		icon: Terminal,
		title: "Terminal Tools",
		description:
			"Pipe-friendly CLI utilities for incorporating ASCII art generation in scripts.",
	},
	{
		icon: Brackets,
		title: "Syntax Visualizer",
		description:
			"Convert source code structures into AST-based ASCII diagrams for documentation.",
	},
	{
		icon: RefreshCw,
		title: "Format Converter",
		description:
			"Convert between UTF-8, Unicode, ANSI, and classic 7-bit ASCII character sets.",
	},
	{
		icon: Eye,
		title: "Live Preview",
		description:
			"Render ASCII output in real-time with adjustable width, density and contrast.",
	},
	{
		icon: FileCode,
		title: "Export Engine",
		description:
			"Export as plaintext, SVG, PNG or directly to clipboard with formatting preserved.",
	},
]

const Features01 = () => {
	return (
		<div className="min-h-screen flex items-center justify-center py-12 bg-black">
			<div>
				<h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-white font-mono">
					MatrixForge Features
				</h2>
				<div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="flex flex-col border border-white rounded-none py-6 px-5 hover:bg-white hover:text-black transition-all duration-300 bg-black font-mono"
						>
							<div className="mb-3 h-10 w-10 flex items-center justify-center bg-black border border-white rounded-none">
								<feature.icon className="h-6 w-6 text-white" />
							</div>
							<span className="text-lg font-semibold text-white">
								{feature.title}
							</span>
							<p className="mt-1 text-white text-[15px]">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Features01
