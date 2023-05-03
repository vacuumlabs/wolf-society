# wolf-society

Website for Wolf Society Foundation!

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, set up the environment variables:
Create a copy of `.env.template`, name it `.env.local`, and fill out the variables.

```
CONTENTFUL_SPACE_ID - Contentful CMS Space ID
CONTENTFUL_CDN_TOKEN - Contentful CMS Content Delivery API access token
NEXT_PUBLIC_ALCHEMY_API_KEY - Alchemy API key
NEXT_PUBLIC_MEDIUM_USER - Username of the Medium user to display blog posts of
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
