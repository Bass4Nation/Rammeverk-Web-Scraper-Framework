import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
  const url = req.query.url as string;

  try {
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);
    const html = $("*");
    console.log(html.text());

    res.send(html.text());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the website");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
