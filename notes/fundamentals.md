# Fundamentals

## Benefits of Next.js

### Different Rendering Techniques

> SSG, SSR, CSR and ISR in Next.js over just CSR or SSR(with stress) as in CRA

#### SSG: HTML at build time

> Build time generation of HTML pages and pre-downloading of needed content(static assets) - huge performance boost as pages are cached and served from CDN

- For SSG pages that call APIs, the APIs are called during the build process and data is fetched. The static page is then pre-rendered on request .e.g: Products, Blog posts, etc(i.e data that won't get stale in this process)
- Implement this in Next with `getStaticProps`

##### `getStaticProps`

- can only be exported from a page file
- meant for all routes
- only runs at build time
- only runs on server side
- won't be included in client side bundle
- on dev, runs on client and server side

##### `getStaticPaths`

- can only be exported from a page file
- meant for dynamic routes
- page must also export `getStaticProps`
- only runs at build time
- only runs on server side
- won't be included in client side bundle
- on dev, runs on client and server side

#### SSR / Dynamic Rendering: new HTML for every request

> Server side generation of HTML pages - pages serve fresh content on every request(e.g: Dynamic news feed, Netflix)

- can only be exported from a page file
- meant for all routes
- only runs on server side
- won't be included in client side bundle
- on dev, runs on client and server side
- page must export `getServerSideProps`
- Much slower than SSG and ISR.
- Available with CRA, but requires complex setup
- Data is not cached on CDN
- Implement this in Next with `getServersideProps`

#### CSR: HTML generated from JS

> Client side generation of HTML pages using JS. e.g: Dashboard pages

- Fetch data on client-side iff **_page contains frequently updating data that don't need to be pre-rendered_**

  > SWR: `stale-while-revalidate`

#### ISR(Incremental Static Regeneration): HTML at build time + new HTML for every request or at specific interval

> Generate HTML pages at build time and update them at runtime, after a specific interval(e.g 60s) - SSG + SSR

- Build time generation can take a lot of time with a lot of pages or should a page get stale, the build process has to repeat all over again.
- Implement this in Next with `getStaticProps` with `revalidate`

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
