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
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Encoding videos for the animations on the About page

You need to [download `ffmpeg`](https://ffmpeg.org/download.html).

Then run:

```
./ffmpeg -i Deforestation-video.mp4 -vf scale=1440:-1 -c:v libx264 -profile:v baseline -x264opts keyint=3:min-keyint=2 -r 25 -movflags +faststart+rtphint -map 0 -map -0:a out/Deforestation1440.mp4
```

Controls:

- `scale=1440:-1` - This will produce video 1440px wide
- `-map 0 -map -0:a` - This removes all audio tracks - `-map 0` selects all streams from the input, and `-map -0:a` deselects all audio streams

# Backend - Vercel Postgres

- currently _not_ SOC2 Type 2 compliant, however Vercel is reputable and we assume they'll achieve it in the future.
- Postgres 15
- 0.25 logical CPUs
- cold starts after 5 min inactivity for <= 5s
- 1 db deploy region and Serverless and Edge function compatibility.
  - After creating a database, we cannot change its region.
  - relatively limited regions: 3 us, 1 eu, 1 ap (singapore).
- compatible with ORMs: we use [Kysely](https://github.com/kysely-org/kysely)

## Authentication

- User signs payload using Metamask (blockchain communication)
- BE verifies the signature using user's public key contained in the payload
- Specific payload content etc. TBD in the near future
