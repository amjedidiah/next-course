const Airtable = require("airtable")
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

export default base(process.env.AIRTABLE_TABLE_ID)

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
  imgUrl: "fldSR015VZzziL0CW"
}
