const fs = require("fs")
const csv = require("csv-parser")
const path = require("path")

class CSVReader {
  constructor(csvFilePath) {
    this.csvFilePath = csvFilePath
  }

  async readData() {
    return new Promise((resolve, reject) => {
      const results = []

      if (!fs.existsSync(this.csvFilePath)) {
        reject(new Error(`CSV file not found: ${this.csvFilePath}`))
        return
      }

      fs.createReadStream(this.csvFilePath)
        .pipe(csv())
        .on("data", (data) => {
          // Clean up the data and ensure all required fields exist
          const cleanData = {
            domain: data.domain?.trim() || "",
            title: data.title?.trim() || "",
            description: data.description?.trim() || "",
            phone: data.phone?.trim() || "",
            address: data.address?.trim() || "",
          }

          if (cleanData.domain) {
            results.push(cleanData)
          }
        })
        .on("end", () => {
          console.log(`✅ Successfully read ${results.length} records from CSV`)
          resolve(results)
        })
        .on("error", (error) => {
          reject(error)
        })
    })
  }
}

module.exports = CSVReader
