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
    const { id, name, address, neighborhood, upvotes, imgUrl } = req.body

    if (req.method !== "POST")
      throw new ServerResponse(null, "Only POST requests allowed", 405)

    // Check for required fields
    if (!id || !name || !upvotes)
      throw new ServerResponse(null, "Missing required fields", 400)

    // Check if the store already exists
    const existingStore = await table
      .select({ filterByFormula: `id = "${id}"` })
      .firstPage()

    if (existingStore.length)
      throw new ServerResponse(null, "Store already exists", 409)

    const createdRecords = await table.create([
      {
        fields: {
          [tableColumnIds.id]: id,
          [tableColumnIds.name]: name,
          [tableColumnIds.address]: address,
          [tableColumnIds.neighborhood]: neighborhood,
          [tableColumnIds.upvotes]: upvotes,
          [tableColumnIds.imgUrl]: imgUrl,
        },
      },
    ])

    return res.status(200).json({
      data: {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      },
      message: "Store created successfully",
      statusCode: 201,
      name: "Success",
    })
  } catch ({ data, message, statusCode, name }: any) {
    return res
      .status(statusCode as number)
      .json({ data, message, statusCode, name } as ServerResponse<null>)
  }
}
