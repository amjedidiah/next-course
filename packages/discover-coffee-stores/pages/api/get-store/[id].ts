import table, { AirtableRecord } from "config/airtable.config"
import { NextApiRequest, NextApiResponse } from "next"
import ServerResponse from "utils/types/server-response"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse<AirtableRecord | null>>
) {
  try {
    const { id } = req.query

    if (req.method !== "GET")
      throw new ServerResponse(null, "Only GET requests allowed", 405)

    if (!id) throw new ServerResponse(null, "id is required", 400)

    // Check if the store already exists
    const existingStore = await table
      .select({ filterByFormula: `id = "${id}"`, maxRecords: 1 })
      .firstPage()

    if (!existingStore.length)
      throw new ServerResponse(null, "Store does not exist", 404)

    return res.status(200).json({
      data: existingStore[0].fields,
      message: "Store retrieved successfully",
      statusCode: 200,
      name: "Success",
    })
  } catch ({ data, message, statusCode, name }: unknown) {
    return res
      .status((statusCode ?? 500) as number)
      .json({ data, message, statusCode, name } as ServerResponse<null>)
  }
}
