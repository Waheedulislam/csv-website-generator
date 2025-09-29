class TemplateProcessor {
  constructor() {
    this.spinSyntaxRegex = /\[\[([^\]]+)\]\]/g
    this.placeholderRegex = /\{\{\s*(\w+)\s*\}\}/g
  }

  // Process spin syntax like [[Quick|Fast|Speedy]]
  processSpinSyntax(text) {
    return text.replace(this.spinSyntaxRegex, (match, options) => {
      const choices = options.split("|").map((choice) => choice.trim())
      const randomIndex = Math.floor(Math.random() * choices.length)
      return choices[randomIndex]
    })
  }

  // Replace placeholders like {{ phone }} with actual data
  replacePlaceholders(text, data) {
    return text.replace(this.placeholderRegex, (match, key) => {
      return data[key] || match
    })
  }

  // Process a template file with both spin syntax and placeholders
  processTemplate(templateContent, data) {
    // First process spin syntax (random selection)
    let processed = this.processSpinSyntax(templateContent)

    // Then replace placeholders with actual data
    processed = this.replacePlaceholders(processed, data)

    return processed
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = TemplateProcessor
} else if (typeof window !== "undefined") {
  window.TemplateProcessor = TemplateProcessor
}
