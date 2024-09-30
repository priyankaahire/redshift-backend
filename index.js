const express = require('express');
const { Client } = require('pg');  // PostgreSQL client for connecting to Redshift

const app = express();
const port = 3000;

// Configure Redshift connection
const redshiftClient = new Client({
  host: 'your-redshift-endpoint',  // Redshift endpoint
  port: 5439,                      // Default Redshift port
  user: 'your-username',           // Redshift username
  password: 'your-password',       // Redshift password
  database: 'your-database-name'   // Redshift database name
});

// Connect to Redshift
redshiftClient.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to Redshift');
  }
});

// Sample API route to query Redshift
app.get('/api/data', async (req, res) => {
  try {
    const result = await redshiftClient.query('SELECT * FROM your_table LIMIT 10;'); // Example query
    res.json(result.rows);  // Return the rows as JSON
  } catch (err) {
    console.error('Error querying Redshift:', err);
    res.status(500).json({ error: 'Error fetching data from Redshift' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
