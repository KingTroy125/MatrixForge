"use client"

import type React from "react"

import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { GripVertical, Upload, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Define a type for colored ASCII characters
type ColoredChar = {
  char: string
  color: string
}

export default function AsciiConverter() {
  const [resolution, setResolution] = useState(0.11)
  const [inverted, setInverted] = useState(false)
  const [grayscale, setGrayscale] = useState(true)
  const [charSet, setCharSet] = useState("standard")
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [asciiArt, setAsciiArt] = useState<string>("")
  const [coloredAsciiArt, setColoredAsciiArt] = useState<ColoredChar[][]>([])
  const [leftPanelWidth, setLeftPanelWidth] = useState(25) // percentage
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  // Add a new ref for the output canvas
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)

  const charSets = {
    standard: " .:-=+*#%@",
    detailed: " .,:;i1tfLCG08@",
    blocks: " ░▒▓█",
    minimal: " .:█",
    hacker: " .:10",
  }

  // Set hydration state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    // Check if we're on the client side
    setIsDesktop(window.innerWidth >= 768)

    // Add resize listener
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 768
      setIsDesktop(newIsDesktop)

      // Reset panel width if switching between mobile and desktop
      if (newIsDesktop !== isDesktop) {
        setLeftPanelWidth(25) // Reset to default when switching layouts
      }
    }

    window.addEventListener("resize", handleResize)

    // Load default image
    loadDefaultImage()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isDesktop, isHydrated])

  // Check if sidebar is narrow
  useEffect(() => {
    if (!isHydrated || !isDesktop) return

    // Check if sidebar is narrow (less than 200px)
    const checkSidebarWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const sidebarWidth = (leftPanelWidth / 100) * containerWidth
        setSidebarNarrow(sidebarWidth < 350)
      }
    }

    checkSidebarWidth()

    // Add resize listener to check sidebar width
    window.addEventListener("resize", checkSidebarWidth)

    return () => {
      window.removeEventListener("resize", checkSidebarWidth)
    }
  }, [leftPanelWidth, isHydrated, isDesktop])

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      convertToAscii()
    }
  }, [resolution, inverted, grayscale, charSet, imageLoaded])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

        // Limit the minimum width of each panel to 20%
        if (newLeftWidth >= 20 && newLeftWidth <= 80) {
          setLeftPanelWidth(newLeftWidth)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const startDragging = () => {
    setIsDragging(true)
  }

  const loadDefaultImage = () => {
    setLoading(true)
    setError(null)
    setImageLoaded(false)

    // Create a new image element
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        setError("Invalid image dimensions")
        setLoading(false)
        return
      }

      imageRef.current = img
      setImageLoaded(true)
      setLoading(false)
    }

    img.onerror = () => {
      setError("Failed to load image")
      setLoading(false)
    }

    // Set the source after setting up event handlers
    img.src =
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800"
  }

  const loadImage = (src: string) => {
    setLoading(true)
    setError(null)
    setImageLoaded(false)

    // Create a new image element
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        setError("Invalid image dimensions")
        setLoading(false)
        return
      }

      imageRef.current = img
      setImageLoaded(true)
      setLoading(false)
    }

    img.onerror = () => {
      setError("Failed to load image")
      setLoading(false)
    }

    // Set the source after setting up event handlers
    img.src = src
  }

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        loadImage(e.target.result as string)
      }
    }
    reader.onerror = () => {
      setError("Failed to read file")
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(true)
  }

  const handleDragLeave = () => {
    setIsDraggingFile(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  // Helper function to adjust color brightness
  const adjustColorBrightness = (r: number, g: number, b: number, factor: number): string => {
    // Ensure the colors are visible against black background
    const minBrightness = 40 // Minimum brightness to ensure visibility
    r = Math.max(Math.min(Math.round(r * factor), 255), minBrightness)
    g = Math.max(Math.min(Math.round(g * factor), 255), minBrightness)
    b = Math.max(Math.min(Math.round(b * factor), 255), minBrightness)
    return `rgb(${r}, ${g}, ${b})`
  }

  // Add this function after the adjustColorBrightness function
  const renderToCanvas = () => {
    if (!outputCanvasRef.current || !asciiArt || coloredAsciiArt.length === 0) return

    const canvas = outputCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set font properties to match the DOM rendering
    const fontSize = 8 // Base font size in pixels
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"

    // Calculate dimensions
    const lineHeight = fontSize
    const charWidth = fontSize * 0.6 // Approximate width of monospace character

    // Resize canvas to fit the ASCII art
    if (grayscale) {
      const lines = asciiArt.split("\n")
      const maxLineLength = Math.max(...lines.map((line) => line.length))
      canvas.width = maxLineLength * charWidth
      canvas.height = lines.length * lineHeight
    } else {
      canvas.width = coloredAsciiArt[0].length * charWidth
      canvas.height = coloredAsciiArt.length * lineHeight
    }

    // Re-apply font after canvas resize
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"

    // Render the ASCII art
    if (grayscale) {
      ctx.fillStyle = "white"
      asciiArt.split("\n").forEach((line, lineIndex) => {
        ctx.fillText(line, 0, lineIndex * lineHeight)
      })
    } else {
      coloredAsciiArt.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          ctx.fillStyle = col.color
          ctx.fillText(col.char, colIndex * charWidth, rowIndex * lineHeight)
        })
      })
    }
  }

  // Add this effect to trigger canvas rendering when ASCII art changes
  useEffect(() => {
    if (imageLoaded && !loading && !error) {
      renderToCanvas()
    }
  }, [asciiArt, coloredAsciiArt, grayscale, loading, error, imageLoaded])

  const convertToAscii = () => {
    try {
      if (!canvasRef.current || !imageRef.current) {
        throw new Error("Canvas or image not available")
      }

      const img = imageRef.current

      // Validate image dimensions
      if (img.width === 0 || img.height === 0) {
        throw new Error("Invalid image dimensions")
      }

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Calculate dimensions based on resolution
      const width = Math.floor(img.width * resolution)
      const height = Math.floor(img.height * resolution)

      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, img.width, img.height)

      // Get image data - this is where the error was occurring
      let imageData
      try {
        imageData = ctx.getImageData(0, 0, img.width, img.height)
      } catch (e) {
        throw new Error("Failed to get image data. This might be a CORS issue.")
      }

      const data = imageData.data

      // Choose character set
      const chars = charSets[charSet as keyof typeof charSets]

      // Calculate aspect ratio correction for monospace font
      const fontAspect = 0.5 // Width/height ratio of monospace font characters
      const widthStep = Math.ceil(img.width / width)
      const heightStep = Math.ceil(img.height / height / fontAspect)

      let result = ""
      const coloredResult: ColoredChar[][] = []

      // Process the image
      for (let y = 0; y < img.height; y += heightStep) {
        const coloredRow: ColoredChar[] = []

        for (let x = 0; x < img.width; x += widthStep) {
          const pos = (y * img.width + x) * 4

          const r = data[pos]
          const g = data[pos + 1]
          const b = data[pos + 2]

          // Calculate brightness based on grayscale setting
          let brightness
          if (grayscale) {
            // Standard grayscale calculation
            brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          } else {
            // Color-aware brightness (perceived luminance)
            brightness = Math.sqrt(
              0.299 * (r / 255) * (r / 255) + 0.587 * (g / 255) * (g / 255) + 0.114 * (b / 255) * (b / 255),
            )
          }

          // Invert if needed
          if (inverted) brightness = 1 - brightness

          // Map brightness to character
          const charIndex = Math.floor(brightness * (chars.length - 1))
          const char = chars[charIndex]

          result += char

          // For colored mode, store the character and its color
          if (!grayscale) {
            // Adjust color brightness based on the character density
            // Characters with more "ink" (later in the charset) should be brighter
            const brightnessFactor = (charIndex / (chars.length - 1)) * 1.5 + 0.5
            const color = adjustColorBrightness(r, g, b, brightnessFactor)
            coloredRow.push({ char, color })
          } else {
            // For grayscale mode, we still need to populate the array
            coloredRow.push({ char, color: "white" })
          }
        }

        result += "\n"
        coloredResult.push(coloredRow)
      }

      setAsciiArt(result)
      setColoredAsciiArt(coloredResult)
      setError(null)
    } catch (err) {
      console.error("Error converting to ASCII:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setAsciiArt("")
      setColoredAsciiArt([])
    }
  }

  const downloadAsciiArt = () => {
    if (!asciiArt) {
      setError("No ASCII art to download")
      return
    }

    const element = document.createElement("a")
    const file = new Blob([asciiArt], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "ascii-art.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Header Section with Back Button */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black font-mono text-sm"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-mono mb-3 sm:mb-4">
            ASCII Art Converter
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white font-mono max-w-2xl mx-auto leading-relaxed px-2">
            Transform your images into beautiful ASCII art with customizable parameters and real-time preview.
          </p>
        </div>

        {/* Settings Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 border border-white bg-black">
            <div className="space-y-3">
              <Label htmlFor="resolution-main" className="text-white font-mono text-sm">
                Resolution: {resolution.toFixed(2)}
              </Label>
              <Slider
                id="resolution-main"
                min={0.05}
                max={0.3}
                step={0.01}
                value={[resolution]}
                onValueChange={(value) => setResolution(value[0])}
                className="[&>span]:border-white [&_.bg-primary]:bg-white [&>.bg-background]:bg-gray-800"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="charset-main" className="text-white font-mono text-sm">
                Character Set
              </Label>
              <Select value={charSet} onValueChange={setCharSet}>
                <SelectTrigger id="charset-main" className="bg-black border-white text-white font-mono">
                  <SelectValue placeholder="Select character set" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white text-white font-mono">
                  <SelectItem value="standard" className="focus:bg-white focus:text-black font-mono">
                    Standard
                  </SelectItem>
                  <SelectItem value="detailed" className="focus:bg-white focus:text-black font-mono">
                    Detailed
                  </SelectItem>
                  <SelectItem value="blocks" className="focus:bg-white focus:text-black font-mono">
                    Block Characters
                  </SelectItem>
                  <SelectItem value="minimal" className="focus:bg-white focus:text-black font-mono">
                    Minimal
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Switch
                  id="invert-main"
                  checked={inverted}
                  onCheckedChange={setInverted}
                  className="data-[state=checked]:bg-white"
                />
                <Label htmlFor="invert-main" className="text-white font-mono text-sm">
                  Invert Colors
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="grayscale-main"
                  checked={grayscale}
                  onCheckedChange={setGrayscale}
                  className="data-[state=checked]:bg-white"
                />
                <Label htmlFor="grayscale-main" className="text-white font-mono text-sm">
                  Grayscale Mode
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-white font-mono text-sm">Actions</Label>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white hover:bg-gray-200 text-black border-white font-mono text-sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  onClick={() => {
                    if (!asciiArt) {
                      setError("No ASCII art to copy")
                      return
                    }
                    const el = document.createElement("textarea")
                    el.value = asciiArt
                    document.body.appendChild(el)
                    el.select()
                    document.execCommand("copy")
                    document.body.removeChild(el)
                    alert("ASCII art copied to clipboard!")
                  }}
                  className="bg-white hover:bg-gray-200 text-black border-white font-mono text-sm"
                  disabled={loading || !imageLoaded}
                >
                  Copy ASCII Art
                </Button>
                <Button
                  onClick={downloadAsciiArt}
                  className="bg-white hover:bg-gray-200 text-black border-white font-mono text-sm"
                  disabled={loading || !imageLoaded || !asciiArt}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mt-4 text-center font-mono">{error}</p>}
        </div>
      </div>

      {/* ASCII Art Preview */}
      <div
        className="px-4 sm:px-6 pb-6 sm:pb-8"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`relative bg-black border border-white min-h-[300px] sm:min-h-[400px] flex items-center justify-center ${
            isDraggingFile ? "bg-opacity-50" : ""
          }`}
        >
          {isDraggingFile && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 select-none">
              <div className="text-white text-lg sm:text-xl font-mono border border-white p-6 sm:p-8 bg-black">Drop image here</div>
            </div>
          )}
          {loading ? (
            <div className="text-white font-mono select-none border border-white p-6 sm:p-8 bg-black">Loading image...</div>
          ) : error ? (
            <div className="text-red-400 font-mono p-6 sm:p-8 text-center select-none border border-white bg-black">
              {error}
              <div className="mt-2 text-white text-sm">Try uploading a different image or refreshing the page.</div>
            </div>
          ) : (
            <canvas
              ref={outputCanvasRef}
              className="max-w-full select-text border border-white"
              style={{
                fontSize: "0.3rem",
                lineHeight: "0.3rem",
                fontFamily: "monospace",
              }}
            />
          )}
        </div>
      </div>

      {/* Hidden elements */}
      <div className="hidden">
        <canvas ref={canvasRef} width="300" height="300"></canvas>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  )
}