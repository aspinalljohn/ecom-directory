import { sampleListings, type Listing } from '@/data/categories'

const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID

/**
 * Fetch listings from a published Google Sheet (CSV format).
 *
 * To use this:
 * 1. Create a Google Sheet with columns: name, description, url, category, subcategory, pricing, tags, featured
 * 2. Go to File → Share → Publish to the web → Select "Comma-separated values (.csv)" → Publish
 * 3. Copy the sheet ID from the URL and set VITE_GOOGLE_SHEETS_ID in your .env
 *
 * The "tags" column should be pipe-separated (e.g. "popular|beginner-friendly")
 * The "featured" column should be "true" or "false"
 */
export async function fetchListingsFromSheets(): Promise<Listing[]> {
  if (!SHEETS_ID) {
    console.info('No Google Sheets ID configured. Using sample data.')
    return sampleListings
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/export?format=csv`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)

    const csv = await res.text()
    return parseCsv(csv)
  } catch (err) {
    console.error('Failed to fetch from Google Sheets, falling back to sample data:', err)
    return sampleListings
  }
}

function parseCsv(csv: string): Listing[] {
  const lines = csv.split('\n').filter(line => line.trim())
  if (lines.length < 2) return sampleListings

  const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase().trim())

  return lines.slice(1).map(line => {
    const values = parseCsvLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i]?.trim() ?? ''
    })

    return {
      name: row.name || '',
      description: row.description || '',
      url: row.url || '',
      category: row.category || '',
      subcategory: row.subcategory || '',
      pricing: row.pricing || '',
      tags: (row.tags || '').split('|').map(t => t.trim()).filter(Boolean),
      featured: row.featured === 'true',
    }
  }).filter(l => l.name && l.category)
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
