// This file is javascript code since I did not get the Typescript version to work.
const express = require("express"); // Added express to create the server.
const axios = require("axios"); // Added axios to scrape the website.
const cheerio = require("cheerio"); // Added cheerio to scrape the website.
const rateLimit = require("express-rate-limit"); // Added a limiter since it would not stop scraping the website. So a limiter was added to stop the scraping.
const cors = require("cors"); // Added cors to allow the website to access the api.

const app = express(); // Added express to create the server.
const PORT = process.env.PORT || 3002; // Changed the port to 3000 since 8080 was already in use. 

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});
app.use(cors()); // Added cors to allow the website to access the api. 
// More info at: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS 
// ----------------- Routes ----------------- //
app.use("/scrape", limiter); // Apply rate limiter to the /scrape endpoint
// Added a limiter since it would not stop scraping the website. So a limiter was added to stop the scraping.

app.get("/scrape", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);
    const html = $("*"); // Changed the * to div etc.... to only scrape the div tags.
    console.log(html.text()); // Logging the html text to the console. Logging what is being scraped to console.

    res.send(html.text());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the website");
  }
});

// ----------------- Routes for scaping and returning as array ----------------- //
app.use("/scrapearray", limiter); // Apply rate limiter to the /scrape endpoint
// Added a limiter since it would not stop scraping the website. So a limiter was added to stop the scraping.

app.get("/scrapearray", async (req, res) => { 
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);
    const elements = [];

    $("*").each(function () {
      elements.push($(this).html());
      // console.log($(this).html());
    });

    res.send(elements);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the website");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

