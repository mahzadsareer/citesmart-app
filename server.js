const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/cite', async (req, res) => {
  const { prompt, mode } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  try {
    // Use web_search for auto and fullref modes, plain for manual
    const tools = mode !== 'manual'
      ? [{ type: 'web_search_20250305', name: 'web_search' }]
      : undefined;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      ...(tools ? { tools } : {}),
      messages: [{ role: 'user', content: prompt }]
    });

    // Extract text blocks (may come after tool_use blocks)
    const textBlocks = response.content.filter(b => b.type === 'text');
    let raw = textBlocks.map(b => b.text).join('');
    raw = raw.replace(/```json|```/g, '').trim();

    // Parse the JSON response
    const result = JSON.parse(raw);
    res.json(result);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CiteSmart running on http://localhost:${PORT}`));
