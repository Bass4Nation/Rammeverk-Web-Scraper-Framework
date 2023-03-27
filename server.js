// This file is javascript code since I did not get the Typescript version to work.
const express = require("express"); // Added express to create the server.
const axios = require("axios"); // Added axios to scrape the website.
const cheerio = require("cheerio"); // Added cheerio to scrape the website.
const rateLimit = require("express-rate-limit"); // Added a limiter since it would not stop scraping the website. So a limiter was added to stop the scraping.
const cors = require("cors"); // Added cors to allow the website to access the api.
const puppeteer = require("puppeteer"); //
const { title } = require("process");

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
    errorcodes(error, res);
  }
});

app.get("/scrapescreenshot", async (req, res) => {
  // Coming soon
  // Create folder if folder does not exist
  // public/scraped-screenshots/

  const url = req.query.url;
  // console.log(url);
  let filename = "template";
  const filetype = ".png";

  filename = await titleFromURL(url);

  console.log(filename);

  const savepath = "./public/scraped-screenshots/" + filename + filetype;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: savepath });
    await browser.close();
  } catch (error) {
    errorcodes(error, res);
  }
});

// Get a list over all screenshots taken. With filepath and a way display them.
app.get("/scrapescreenshotlist", async (req, res) => {
  // Path to folder where screenshots is placed from standpoint to the server
  //  ./public/scraped-screenshots/......
  const folder_path = "./public/scraped-screenshots";

  const arr = [
    {
      name: "",
      path: "",
    },
  ];
  try {
  } catch (error) {
    errorcodes(error, res);
  }
});



// A function that convert link to this format : komplett_no_2023327164050
async function titleFromURL(url) {
  const date = new Date();
  const timestamp = `${date.getFullYear()}${
    date.getMonth() + 1
  }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  const filename = `${url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/[^a-zA-Z0-9_]/g, "_")}_${timestamp}`;

  return filename;
}

// Error codes simplified 
const errorcodes = (error, code) => {
  console.error(error);
  code.status(500).send("Error occurred while scraping the website");
};

// puppeteer can also make pdf. Maybe create in later stages.


// Prints in terminal when the server is starting. It is this port that the requests are going through.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
