import { MagicUserMetadata } from "@magic-sdk/admin"

export type HasuraUser = {
  id: string
  email: string
  issuer: string
  publicAddress: string
}

type GraphQLResponse<T> = {
  data: T
  errors: {
    message: string
  }[]
}

export default async function queryHasuraGraphQL<T>({
  operationsDoc,
  operationName,
  variables,
  token,
}: {
  operationsDoc: string
  operationName: string
  variables: object
  token: string
}): Promise<GraphQLResponse<T>> {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API_URL as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  )

  return await result.json()
}

export const getUser = (issuer: string, token: string) =>
  queryHasuraGraphQL<{ users: HasuraUser[] }>({
    operationsDoc: `
      query MyQuery($issuer: String) {
        users(where: {issuer: {_eq: $issuer}}) {
          email
          id
          issuer
          publicAddress
        }
      }
    `,
    operationName: "MyQuery",
    variables: { issuer },
    token,
  })

export const insertUser = (
  { email, issuer, publicAddress }: MagicUserMetadata,
  token: string
) =>
  queryHasuraGraphQL<{ insert_users_one: HasuraUser }>({
    operationsDoc: `
      mutation MyMutation($email: String!, $issuer: String!, $publicAddress: String!) {
        insert_users_one(object: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
          email
        }
      }
    `,
    operationName: "MyMutation",
    variables: {
      email,
      issuer,
      publicAddress,
    },
    token,
  })
