# Fundamentals

## Benefits of Next.js

### Different Rendering Techniques

> SSG, SSR, CSR, ISR over just CSR or SSR(with stress) as in CRA

- SSG: Build time generation of HTML pages - huge performance boost as pages are cached and served from CDN
- SSR: Server side generation of HTML pages - pages serve fresh content on every request(e.g: Dynamic news feed, Netflix)
- CSR: Client side generation of HTML pages
- ISR(Incremental Static Regeneration): generate HTML pages at build time and update them at runtime - SSG + SSR

### Performance

- Code splitting: divides app into small chunks so only the chunk used by the current page is loaded
- Minifying files: get rid of special characters, white space, etc to reduce file size
- Image optimization: a dedicated `Image` component that automatically optimizes images for the web based on the device screen size
- Pre-fetching assets: as you scroll down the page, Next.js will prefetch the code and assets for the next view

### File-based routing and SEO

- Each file/folder in the `pages` directory is mapped to a route. Supports dynamic routes
- API folder for serverless functions

### Serverless Functions

- Serverless functions are similar to API routes, but they allow you to write functions in a file-based approach. This approach makes it easier to share code between server-side and client-side code
- Serverless functions spin up a new Node.js server on every request, execute the function, and then shut down the server

### SWC - Speedy Web Compiler

> NextJS uses SWC to compile your code, which is faster than Babel and TypeScript

### Fast Refresh

> Fast Refresh is a new React feature that allows you to edit your React components in a running app and see your changes without losing component state
