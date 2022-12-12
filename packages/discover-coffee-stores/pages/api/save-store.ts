import table, { AirtableRecord, getExistingStore, tableColumnIds } from "config/airtable.config"
import { NextApiRequest, NextApiResponse } from "next"
import ServerResponse from "utils/types/server-response"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse<AirtableRecord | null>>
) {
  try {
    const { cid: id, name, address, neighborhood, imgUrl } = req.body

    if (req.method !== "POST")
      throw new ServerResponse(null, "Only POST requests allowed", 405)

    // Check for required fields
    if (!(id && name))
      throw new ServerResponse(null, "Missing required fields", 400)

    // Check if the store already exists
    const existingStore = await getExistingStore(id as string)

    if (existingStore.length)
      throw new ServerResponse(null, "Store already exists", 409)

    const createdRecords = await table.create([
      {
        fields: {
          [tableColumnIds.id]: id,
          [tableColumnIds.name]: name,
          [tableColumnIds.address]: address,
          [tableColumnIds.neighborhood]: neighborhood,
          [tableColumnIds.upvotes]: 0,
          [tableColumnIds.imgUrl]: imgUrl,
        },
      },
    ])

    return res.status(200).json({
      data: createdRecords[0].fields,
      message: "Store created successfully",
      statusCode: 201,
      name: "Success",
    })
  } catch ({ data, message, statusCode, name }: unknown) {
    return res
      .status((statusCode ?? 500) as number)
      .json({ data, message, statusCode, name } as ServerResponse<null>)
  }
}
