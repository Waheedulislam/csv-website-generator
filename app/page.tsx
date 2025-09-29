"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Globe, Download, Play } from "lucide-react"

export default function CSVWebsiteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSites, setGeneratedSites] = useState<string[]>([])

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // Simulate generation process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setGeneratedSites(["foodexpress.com", "techhubbd.com", "bookbazaar.com"])
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CSV Website Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your CSV data into beautiful, responsive websites. Each row becomes a complete React application.
          </p>
        </div>

        {/* Main Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Websites from CSV
            </CardTitle>
            <CardDescription>Upload your CSV file and generate multiple React websites automatically</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* CSV Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Sample CSV Data:</h3>
              <div className="text-sm font-mono bg-white p-3 rounded border overflow-x-auto">
                <div className="text-gray-600">domain,title,description,phone,address</div>
                <div>
                  foodexpress.com,Food Express,Delicious meals delivered fast,01712345678,"House 12, Road 5, Banani,
                  Dhaka"
                </div>
                <div>
                  techhubbd.com,Tech Hub BD,Your trusted tech partner,01898765432,"Level 4, Block B, Dhanmondi, Dhaka"
                </div>
                <div>
                  bookbazaar.com,Book Bazaar,Buy and sell books online,01911223344,"Shop 22, New Market, Chittagong"
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dynamic spin syntax: [[Quick|Fast|Speedy]]</li>
                  <li>• CSV data placeholders: {"{{ phone }}"}</li>
                  <li>• Responsive Hero & Contact sections</li>
                  <li>• Standalone React applications</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Output Structure:</h4>
                <div className="text-sm font-mono bg-gray-100 p-2 rounded">
                  /build
                  <br />
                  &nbsp;&nbsp;/foodexpress.com
                  <br />
                  &nbsp;&nbsp;/techhubbd.com
                  <br />
                  &nbsp;&nbsp;/bookbazaar.com
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Websites...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Websites from CSV
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Sites */}
        {generatedSites.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Generated Websites
              </CardTitle>
              <CardDescription>Your websites have been successfully generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {generatedSites.map((site) => (
                  <div
                    key={site}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Globe className="h-3 w-3 mr-1" />
                        {site}
                      </Badge>
                      <span className="text-sm text-gray-600">Ready to deploy</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    1. Navigate to any generated website:{" "}
                    <code className="bg-blue-100 px-1 rounded">cd build/foodexpress.com</code>
                  </p>
                  <p>
                    2. Install dependencies: <code className="bg-blue-100 px-1 rounded">npm install</code>
                  </p>
                  <p>
                    3. Start the development server: <code className="bg-blue-100 px-1 rounded">npm start</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
