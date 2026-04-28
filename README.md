# CiteSmart — AI-Powered Citation Manager

A full-stack citation manager powered by Claude AI with web search. Generate citations from URLs, DOIs, ISBNs, or full reference text in Harvard, APA, MLA, Chicago, Vancouver, IEEE, and more.

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Set your Anthropic API key
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the server
node server.js

# 4. Open browser at http://localhost:3000
```

## Deploy to Railway (Recommended — Free Tier)

1. Push this folder to a GitHub repo
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Add environment variable: `ANTHROPIC_API_KEY=sk-ant-...`
4. Railway auto-detects Node.js and deploys. Done.

## Deploy to Render (Free Tier)

1. Push to GitHub
2. Go to https://render.com → New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env var: `ANTHROPIC_API_KEY=sk-ant-...`

## Deploy to Heroku

```bash
heroku create your-citesmart-app
heroku config:set ANTHROPIC_API_KEY=sk-ant-...
git push heroku main
```

## Deploy to Vercel (Serverless)

Rename `server.js` to `api/cite.js` and adapt to Vercel's serverless function format,
or use the standalone HTML file directly (see below).

## Standalone HTML (No Server)

The file `public/index.html` also works as a pure frontend if you open it directly in a browser.
It will show an API key input field — enter your key and it calls the Anthropic API directly.

> Note: Direct browser access requires the `anthropic-dangerous-direct-browser-access` header,
> which is accepted by Anthropic but means your API key is visible in browser devtools.
> Use the server version for production.

## Features

- 3 input modes: URL/DOI/ISBN auto-lookup, full reference text parsing+verification, manual entry
- AI web search for metadata verification (live web lookup)
- 9 citation styles: Harvard, APA 7th/6th, MLA 9th, Chicago, Vancouver, IEEE, OSCOLA
- Citation library with localStorage persistence
- Search and filter library
- Export as reference list, BibTeX, or RIS
- Download bibliography as .txt

## File Structure

```
citesmart-app/
├── server.js          # Express server + API proxy
├── package.json
├── public/
│   └── index.html     # Full frontend (also works standalone)
└── README.md
```
