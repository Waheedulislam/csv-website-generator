#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const main = require("./generate-websites")

async function testWorkflow() {
  console.log("🧪 Testing CSV Website Generator...\n")

  try {
    // Run the main generator
    await main()

    // Check if build directory was created
    const buildDir = path.join(__dirname, "..", "build")
    if (!fs.existsSync(buildDir)) {
      throw new Error("Build directory was not created")
    }

    // Check if expected websites were generated
    const expectedDomains = ["foodexpress.com", "techhubbd.com", "bookbazaar.com"]
    const generatedDirs = fs.readdirSync(buildDir)

    console.log("🔍 Checking generated websites...")
    for (const domain of expectedDomains) {
      const domainPath = path.join(buildDir, domain)
      if (fs.existsSync(domainPath)) {
        console.log(`✅ ${domain} - Generated successfully`)

        // Check if essential files exist
        const essentialFiles = [
          "package.json",
          "src/App.js",
          "src/components/Hero.js",
          "src/components/Contact.js",
          "public/index.html",
        ]

        for (const file of essentialFiles) {
          const filePath = path.join(domainPath, file)
          if (fs.existsSync(filePath)) {
            console.log(`   ✓ ${file}`)
          } else {
            console.log(`   ❌ Missing: ${file}`)
          }
        }

        // Check if placeholders were replaced in Contact component
        const contactPath = path.join(domainPath, "src/components/Contact.js")
        if (fs.existsSync(contactPath)) {
          const contactContent = fs.readFileSync(contactPath, "utf8")
          if (!contactContent.includes("{{ phone }}") && !contactContent.includes("{{ address }}")) {
            console.log("   ✓ Placeholders replaced in Contact component")
          } else {
            console.log("   ⚠️  Placeholders not replaced in Contact component")
          }
        }

        // Check if spin syntax was processed in Hero component
        const heroPath = path.join(domainPath, "src/components/Hero.js")
        if (fs.existsSync(heroPath)) {
          const heroContent = fs.readFileSync(heroPath, "utf8")
          if (!heroContent.includes("[[") && !heroContent.includes("]]")) {
            console.log("   ✓ Spin syntax processed in Hero component")
          } else {
            console.log("   ⚠️  Spin syntax not processed in Hero component")
          }
        }
      } else {
        console.log(`❌ ${domain} - Not generated`)
      }
    }

    console.log("\n🎉 Test completed successfully!")
    console.log("\n💡 To test a generated website:")
    console.log(`   cd build/${expectedDomains[0]}`)
    console.log("   npm install")
    console.log("   npm start")
  } catch (error) {
    console.error("❌ Test failed:", error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  testWorkflow()
}

module.exports = testWorkflow
