# Hasura

> Adds a layer of GraphQL on top of a SQL database
> Benefit is, we can switch databases at any time, as we are just responsible for writing the GraphQL queries and mutations, while Hasura maintains the rest

## JWT

Open industry standard RFC 7519 method for representing claims securely between two parties, a client and a server.
When decoded, it is broken up into:

- Header
- Payload
- Signature

### Header

> This is the first part of the JSON Web Token and contains two parts: the type of the token, which is JWT, and the signing algorithm being used, such as `HMAC`, `SHA256` or `RSA`

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

> The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022 // issued at
}
```

### Signature

> To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```
