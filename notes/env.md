# ENV Variables

## Environment Variables in `next.config.js`

> These variables are only available in the client side and not server-side

```js
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    customKey: process.env.customKey,
  },
};
```

## Environment Variables in `.env.local`

> These variables are available by default in the server-side. To make them available in the client side, add `NEXT_PUBLIC_` prefix to the variable name.

```bash
# .env.local
CUSTOM_KEY=customValue
NEXT_PUBLIC_CUSTOM_KEY=customValue
```
