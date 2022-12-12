import table, {
  AirtableRecord,
  getExistingStore,
  tableColumnIds,
} from "config/airtable.config"
import { NextApiRequest, NextApiResponse } from "next"
import ServerResponse from "utils/types/server-response"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse<AirtableRecord | null>>
) {
  try {
    const { id } = req.query

    if (req.method !== "PATCH")
      throw new ServerResponse(null, "Only PATCH requests allowed", 405)

    // Check for required fields
    if (!id) throw new ServerResponse(null, "Missing required fields", 400)

    // Check if the store already exists
    const existingStore = await getExistingStore(id as string)

    if (!existingStore.length)
      throw new ServerResponse(null, "Store does not exist", 404)

    const {
      id: airtableId,
      fields: { upvotes },
    } = existingStore[0]

    const updatedRecord = await table.update([
      {
        id: airtableId,
        fields: {
          [tableColumnIds.upvotes]: upvotes + 1,
        },
      },
    ])

    return res.status(200).json({
      data: updatedRecord[0].fields,
      message: "Store upvoted successfully",
      statusCode: 200,
      name: "Success",
    })
  } catch ({ data, message, statusCode, name }: unknown) {
    return res
      .status((statusCode ?? 500) as number)
      .json({ data, message, statusCode, name } as ServerResponse<null>)
  }
}
