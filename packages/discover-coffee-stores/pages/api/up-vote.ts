import table, { AirtableRecord, tableColumnIds } from "config/airtable.config"
import { NextApiRequest, NextApiResponse } from "next"
import ServerResponse from "utils/types/server-response"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ServerResponse<{ id: string; fields: AirtableRecord }>
    | ServerResponse<null>
  >
) {
  try {
    const { airtableId, upvotes } = req.body

    if (req.method !== "PATCH")
      throw new ServerResponse(null, "Only PATCH requests allowed", 405)

    // Check for required fields
    if (!airtableId || !upvotes)
      throw new ServerResponse(null, "Missing required fields", 400)

    // Check if the store already exists
    const existingStore = await table.find(airtableId)

    if (!existingStore.length)
      throw new ServerResponse(null, "Store does not exist", 404)

    const updatedRecord = await table.update([
      {
        id: airtableId,
        fields: {
         [tableColumnIds.upvotes]: upvotes,
        },
      },
    ])

    return res.status(200).json({
      data: {
        id: updatedRecord[0].id,
        fields: updatedRecord[0].fields,
      },
      message: "Store upvoted successfully",
      statusCode: 200,
      name: "Success",
    })
  } catch ({ data, message, statusCode, name }: any) {
    return res
      .status(statusCode as number)
      .json({ data, message, statusCode, name } as ServerResponse<null>)
  }
}
