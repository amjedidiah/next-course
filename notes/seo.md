# SEO

SEO comprises of using:

- Semantics
- Meta tags: especially for `title` and `description`
- Image alt tags: already handled by Next.js

## SEO Ratings

SEO ratings are dependent on:

- **Click through rate**: users that have clicked on a page
- **Bounce rate**: users that click back - should be lower
- **Dwell time**: users that spend time on a site

## Page Loading[Next.js App vs CRA App

### Pre-rendering: server is responsible

- User makes request
- Server sends static HTML with data
- Browser renders HTML & downloads JS
- User sees static HTML page with content[no interactivity]

### Hydration

- JS loads
- User can now interact with page

| Next.js                                                   | CRA                                    |
| --------------------------------------------------------- | -------------------------------------- |
| User makes request                                        | User makes request                     |
| Server sends static HTML with data                        | Server sends HTML with links           |
| Browser renders HTML & downloads JS                       | Browser downloads HTML & JS            |
| User sees static HTML page with content[no interactivity] | User sees blank page[no interactivity] |
| JS loads                                                  | JS loads                               |
| User can now interact with page                           | User can now interact with page        |

> In Next.js, server is responsible for rendering content, while in CRA, JS is responsible

## CDNs

> CDNs improve site performance by using a distributed network of servers to deliver resources to users, based on their location.
