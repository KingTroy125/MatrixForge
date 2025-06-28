import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Upload, Download } from "lucide-react"
import { LensDemo } from "../lens-demo"
import Link from "next/link"

const steps = [
	{
		number: "01",
		title: "Input Source Material",
		description:
			"Paste code snippets, feed file content via stdin, or upload binary data for conversion.",
		icon: Code,
	},
	{
		number: "02",
		title: "Configure Parameters",
		description:
			"Adjust density mapping, character weights, dimensions, and output resolution.",
		icon: Upload,
	},
	{
		number: "03",
		title: "Process and Export",
		description:
			"Generate output in plaintext, SVG, or image formats with custom padding and encoding.",
		icon: Download,
	},
]

const HowToUse = () => {
	return (
		<div className="py-24 bg-black">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-white text-black font-mono" variant="secondary">
						HOW TO USE MATRIXFORGE
					</Badge>
					<h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white font-mono">
						Image to ASCII Art in Seconds
					</h2>
					<p className="text-xl text-white max-w-2xl mx-auto font-mono">
						MatrixForge lets you convert images and code into ASCII art with full control over output style and formatting.
					</p>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Steps */}
					<div className="space-y-8">
						{steps.map((step, index) => (
							<div key={step.number} className="flex gap-6 group">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 border border-white bg-black flex items-center justify-center group-hover:bg-white group-hover:border group-hover:border-white transition-colors">
										<step.icon className="w-6 h-6 text-white group-hover:text-black" />
									</div>
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="text-sm font-mono text-white">
											{step.number}
										</span>
										<h3 className="text-xl font-semibold text-white font-mono">
											{step.title}
										</h3>
									</div>
									<p className="text-white leading-relaxed font-mono">
										{step.description}
									</p>
									{index < steps.length - 1 && (
										<div className="mt-6 flex items-center gap-2 text-sm text-white font-mono">
											<ArrowRight className="w-4 h-4" />
											<span>Next step</span>
										</div>
									)}
								</div>
							</div>
						))}

						{/* CTA */}
						<div className="pt-8">
							<Link href="/converter">
								<Button
									size="lg"
									className="rounded-none bg-white text-black hover:bg-white font-mono"
								>
									Try It Now
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						</div>
					</div>

					{/* Interactive Demo */}
					<div className="flex justify-center lg:justify-end">
						<div className="relative">
							<div className="relative">
								<LensDemo />
							</div>
							<div className="absolute -bottom-4 -right-4 bg-white text-black px-3 py-1 rounded-none text-sm font-mono">
								Hover to zoom!
							</div>
						</div>
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="mt-20 text-center">
					<div className="inline-flex items-center gap-2 text-sm text-white mb-4 font-mono">
						<div className="w-2 h-2 bg-white rounded-none animate-pulse"></div>
						<span>Ready to process your data?</span>
					</div>
					<h3 className="text-2xl font-semibold mb-4 text-white font-mono">
						Join the developer community using our ASCII conversion engine
					</h3>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							className="rounded-none bg-white text-black hover:bg-white font-mono"
						>
							Download CLI Tool
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="rounded-none border-white text-white hover:bg-white hover:text-black font-mono"
						>
							View Documentation
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowToUse