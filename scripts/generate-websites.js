#!/usr/bin/env node

const path = require("path")
const CSVReader = require("./csv-reader")
const WebsiteGenerator = require("./website-generator")

async function main() {
  try {
    console.log("🌟 CSV Website Generator Starting...\n")

    // Configuration
    const csvFilePath = path.join(__dirname, "..", "websites.csv")
    const templateDir = path.join(__dirname, "..", "templates")
    const outputDir = path.join(__dirname, "..", "build")

    // Check if CSV file exists
    const fs = require("fs")
    if (!fs.existsSync(csvFilePath)) {
      console.error(`❌ CSV file not found: ${csvFilePath}`)
      console.log("Please create a websites.csv file with the following format:")
      console.log("domain,title,description,phone,address")
      console.log("example.com,Example Site,A great website,123-456-7890,123 Main St")
      process.exit(1)
    }

    // Check if template directory exists
    if (!fs.existsSync(templateDir)) {
      console.error(`❌ Template directory not found: ${templateDir}`)
      process.exit(1)
    }

    // Read CSV data
    console.log("📖 Reading CSV data...")
    const csvReader = new CSVReader(csvFilePath)
    const sitesData = await csvReader.readData()

    if (sitesData.length === 0) {
      console.log("⚠️  No valid data found in CSV file")
      process.exit(1)
    }

    // Generate websites
    const generator = new WebsiteGenerator(templateDir, outputDir)
    const results = await generator.generateAllWebsites(sitesData)

    // Exit with appropriate code
    const hasFailures = results.some((r) => !r.success)
    process.exit(hasFailures ? 1 : 0)
  } catch (error) {
    console.error("💥 Fatal error:", error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the main function
if (require.main === module) {
  main()
}

module.exports = main
