# ISO100Shots

A photography portfolio and AI-powered visual storytelling project.

## Overview

ISO100Shots showcases photography through a curated gallery of landscapes, architecture, nature, and framed perspectives. The project combines a Next.js website with Supabase integration to support publishing photographs dynamically.

## Features

- Responsive photography gallery
- Image lightbox for viewing photographs
- Curated photography collections
- Supabase integration for published photos
- SEO metadata, sitemap, and robots configuration
- Visitor-count API endpoint

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend and image storage:** Supabase
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project (required for dynamic photo publishing)

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Use your actual Supabase project URL and publishable/anon key. Never commit `.env.local` or secret service-role keys.

### Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Supabase Photo Publishing

The website retains its existing local gallery and loads additional photos from the `public.photos` table when their status is `published`.

For database columns, Row Level Security (RLS), storage configuration, and deployment variables, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

## Deployment

The project can be deployed on Vercel by connecting the GitHub repository and configuring the required environment variables in the Vercel project settings.

## Project Status

Photography portfolio with Supabase integration in progress.
