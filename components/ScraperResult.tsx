import { useScrapHTML, useScrapHTMLArray } from "@/helper/scrapers/scrapHTML"
import React from "react";

const ScraperResult  = () => {
    const [url, setUrl] = React.useState("");
    const rawHTML: any = useScrapHTMLArray(url);
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
      const inputUrl = event.target.url.value;
      setUrl(inputUrl);
    };
  
    return (
      <div>
        <h1>Scraped Content</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" name="url" defaultValue={url} />
          <button type="submit">Scrape</button>
        </form>
        <pre>{rawHTML}</pre>
      </div>
    );
  };

export default ScraperResult

// Path: components\ScraperResult.ts


