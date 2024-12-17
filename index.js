const express = require('express');
const axios = require('axios');
const https = require('https'); // Required for the API
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(cors());

const API_URL = 'https://rest.cryptoapis.io/market-data/assets/';
const API_KEY = '9df375f42f2791ba088c6bca3cb844cfbef7d370'; // Replace with your actual API key

app.get('/api/crypto/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const fullUrl = `${API_URL}${symbol}?context=yourExampleString`;

  try {
    const response = await axios.get(fullUrl, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Bypass SSL cert verification (NOT RECOMMENDED for production)
      headers: {
        'X-API-Key': API_KEY,
      },
    });
    res.json(response.data.data.item.latestRate.amount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//  **Optional: Health Check Endpoint**
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app; // Export for testing (optional)