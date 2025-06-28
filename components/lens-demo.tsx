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
            src="/assets/img_2.png"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </Lens>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <CardTitle className="text-lg sm:text-2xl"></CardTitle>
        <CardDescription className="text-sm sm:text-base">
          
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-2 sm:space-x-4 p-3 sm:p-6 pt-0">
        <Button size="sm" className="text-xs sm:text-sm">{"Let's go"}</Button>
        <Button variant="secondary" size="sm" className="text-xs sm:text-sm"></Button>
      </CardFooter>
    </Card>
  )
}