const Airtable = require("airtable")
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)

export type AirtableRecord = {
  id: string
  name: string
  address?: string
  neighborhood?: string
  upvotes: number
  imgUrl?: string
}

export const tableColumnIds = {
  id: "fldf9BhkTnxNSYggZ",
  name: "fldshkfdshNqAvhH4",
  address: "fldQ8TptP1ZJNjPBW",
  neighborhood: "fldSdOY43NqSLZj0T",
  upvotes: "fldR8xeCcHCc3pz0L",
  imgUrl: "fldSR015VZzziL0CW",
}

const table = base(AIRTABLE_TABLE_ID)

export const getExistingStore = (id: string) => table
      .select({ filterByFormula: `id = "${id}"`, maxRecords: 1 })
      .firstPage()

export default table
