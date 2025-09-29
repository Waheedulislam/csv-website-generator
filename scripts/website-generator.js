const fs = require("fs-extra")
const path = require("path")
const TemplateProcessor = require("./template-processor")

class WebsiteGenerator {
  constructor(templateDir, outputDir) {
    this.templateDir = templateDir
    this.outputDir = outputDir
    this.templateProcessor = new TemplateProcessor()
  }

  async generateWebsite(siteData) {
    const { domain } = siteData
    const siteOutputDir = path.join(this.outputDir, domain)

    console.log(`🚀 Generating website for ${domain}...`)

    try {
      // Create output directory for this site
      await fs.ensureDir(siteOutputDir)

      // Copy and process all template files
      await this.copyAndProcessDirectory(this.templateDir, siteOutputDir, siteData)

      console.log(`✅ Successfully generated ${domain}`)
      return true
    } catch (error) {
      console.error(`❌ Error generating ${domain}:`, error.message)
      return false
    }
  }

  async copyAndProcessDirectory(sourceDir, targetDir, siteData) {
    const items = await fs.readdir(sourceDir)

    for (const item of items) {
      const sourcePath = path.join(sourceDir, item)
      const targetPath = path.join(targetDir, item)
      const stat = await fs.stat(sourcePath)

      if (stat.isDirectory()) {
        // Recursively process directories
        await fs.ensureDir(targetPath)
        await this.copyAndProcessDirectory(sourcePath, targetPath, siteData)
      } else {
        // Process individual files
        await this.processFile(sourcePath, targetPath, siteData)
      }
    }
  }

  async processFile(sourcePath, targetPath, siteData) {
    const ext = path.extname(sourcePath)

    // Files that need template processing
    const processableExtensions = [".js", ".jsx", ".html", ".json", ".css", ".md"]

    if (processableExtensions.includes(ext)) {
      // Read, process, and write template files
      const content = await fs.readFile(sourcePath, "utf8")
      const processedContent = this.templateProcessor.processTemplate(content, siteData)
      await fs.writeFile(targetPath, processedContent)
    } else {
      // Copy binary files as-is
      await fs.copy(sourcePath, targetPath)
    }
  }

  async generateAllWebsites(sitesData) {
    console.log(`\n🏗️  Starting generation of ${sitesData.length} websites...\n`)

    // Clean output directory
    await fs.remove(this.outputDir)
    await fs.ensureDir(this.outputDir)

    const results = []
    for (const siteData of sitesData) {
      const success = await this.generateWebsite(siteData)
      results.push({ domain: siteData.domain, success })
    }

    // Summary
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    console.log(`\n📊 Generation Summary:`)
    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📁 Output directory: ${this.outputDir}\n`)

    if (successful > 0) {
      console.log(`🎉 Generated websites:`)
      results
        .filter((r) => r.success)
        .forEach((r) => {
          console.log(`   • ${r.domain}`)
        })
      console.log(`\n💡 To run a website:`)
      console.log(`   cd build/${results.find((r) => r.success).domain}`)
      console.log(`   npm start`)
    }

    return results
  }
}

module.exports = WebsiteGenerator
