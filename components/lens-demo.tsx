/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lens } from "@/components/magicui/lens"

export function LensDemo() {
  return (
    <Card className="relative max-w-sm sm:max-w-md shadow-none">
      <CardHeader className="p-3 sm:p-6">
        <Lens zoomFactor={2} lensSize={120} isStatic={false} ariaLabel="Zoom Area">
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image placeholder"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </Lens>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <CardTitle className="text-lg sm:text-2xl">Your next camp</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          See our latest and best camp destinations all across the five continents of the globe.
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-2 sm:space-x-4 p-3 sm:p-6 pt-0">
        <Button size="sm" className="text-xs sm:text-sm">{"Let's go"}</Button>
        <Button variant="secondary" size="sm" className="text-xs sm:text-sm">Another time</Button>
      </CardFooter>
    </Card>
  )
}