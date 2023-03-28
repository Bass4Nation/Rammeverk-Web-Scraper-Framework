import {
  useScrapHTML,
  useScrapHTMLArray,
  useScrapScreenshot,
  useGetListScreenshotsTaken,
  useGetLatestScreenshotsTaken,
} from "@/helper/scrapers/scrapHTML";
import React from "react";
import Image from "next/image";

const ScraperResult = () => {
  // This is just an example on how to use each of the hooks in my webscraper framework.
  // The hooks are located in the helper folder.
  // The hooks are used to scrape data from a website and return the data in a JSON format.
  // Or to take screenshot of a website and return the screenshot in a JSON format.
  // More in depth explanation:
  //  CHECK PDF FILE IN THE ROOT FOLDER OF THE PROJECT OR THE README.md FILE IN THE GITHUB REPO.

  const [url, setUrl] = React.useState("");
  //  -------------- Hooks Triggers Boolean --------------
  const [triggerRaw, setTriggeRaw] = React.useState(false);
  const [triggerArray, setTriggerArray] = React.useState(false);
  const [screenshotTrigger, setScreenshotTrigger] = React.useState(false);

  // -------------- Hooks  --------------
  const screenshotUrl: any = useScrapScreenshot(url, screenshotTrigger);
  const screenshotList: any = useGetListScreenshotsTaken();
  const latestScreenshot: any = useGetLatestScreenshotsTaken();
  const rawHTML: any = useScrapHTML(url, triggerRaw);
  const htmlArray: any = useScrapHTMLArray(url, triggerArray);

  const listEmpty: boolean = false;

  //  ------------ Event Handlers ------------
  const handleBtnClickRaw = () => {
    setTriggeRaw(!triggerRaw);
  };

  const handleBtnClickArray = () => {
    setTriggerArray(!triggerArray);
  };

  const handleBtnClickScreenshot = () => {
    setScreenshotTrigger(!screenshotTrigger);
  };

  // const handleBtnClickScreenshotList = () => {
  //   setScreenshotListTrigger(!screenshotListTrigger);
  // };

  //  -------------- Display Functions --------------




  // Display all screenshots taken from the screenshotListUrl array
  const displayAllScreenshots = () => {
    if (screenshotList.length > 0) {
      // console.log(screenshotList);
      const path: string = "/scraped-screenshots/"
      
      return screenshotList.map((item: any, index: number) => {
        // console.log(path + item.name);
        

        return (
          <div key={index}>
            <Image src={path + item.name} alt={item.name} width={200} height={200} />
          </div>
        );
      });
    } else {
      return <div>There are no screenshots taken yet</div>;
    }
  };

  // Display the latest screenshot taken
  const displayLatestScreenshot = () => {
    console.log(latestScreenshot);
    
    if (latestScreenshot) {
      const path: string = "/scraped-screenshots/"

      return (
        <div>
          <h1>Latest screenshot taken</h1>
          <Image src={path + latestScreenshot.name} alt={latestScreenshot} width={200} height={200} />
        </div>
      );
    } else {
      return <div>There are no screenshots taken yet</div>;
    }
  };


  
const displayScreenshot = () => {

}

  return (
    <>
      <div>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button onClick={handleBtnClickScreenshot}>Scrape Screenshot</button>
        <button onClick={handleBtnClickRaw}>Scrape raw data</button>
        <button onClick={handleBtnClickArray}>Scrape data to array</button>

      </div>
      <div>
        <h1>Last screenshot taken</h1>
        {displayLatestScreenshot()}
      </div>
      <div>
        <h1>Data from array</h1>
      </div>
      <div>
        <h1>Raw data</h1>
      </div>

      <div>
        {/* All pictures in screenshotslist displayed here */}
        {displayAllScreenshots()}
      </div>
    </>
  );
};

export default ScraperResult;

// Path: components\ScraperResult.ts
