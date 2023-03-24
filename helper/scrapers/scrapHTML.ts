import { useState, useEffect } from "react";
import axios from "axios";


const useScrapHTML = (url: string) => {
  const serverUrl = "http://localhost:3002/scrape?url=";
  const [rawHTML, setRawHTML] = useState("");

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await axios.get(serverUrl + encodeURIComponent(url));
        const html = response.data;
        console.log(html);

        setRawHTML(html);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHTML();
  }, [url]); // Add the url to the dependency array

  return rawHTML;
};

const useScrapHTMLArray = (url: string) => {
  const serverUrl = "http://localhost:3002/scrapearray?url="; // url to the server that will scrape the html 
  const [elements, setElements] = useState([]); 

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await axios.get(serverUrl + encodeURIComponent(url)); // get the html from the server sending the url
        const elementsArray = response.data;
        console.log(elementsArray);
        
        

        setElements(elementsArray);
      } catch (error: any) {
        console.log("Axios Error:", error);
        console.log("Error details:", error.response?.data, error.response?.status, error.response?.headers);      }
    };

    fetchHTML();
  }, [url]); // Empty array ensures the effect runs only on component mount

  return elements;
}; 

export {useScrapHTML, useScrapHTMLArray};

// export const useScrapScreenshot = (url: string) => {
//     const [screenshot, setScreenshot] = useState("");

//     useEffect(() => {
//         const fetchScreenshot = async () => {
//             try {
//                 const response = await axios.get(serverUrl + encodeURIComponent(url));
//                 const html = response.data;
//                 console.log(html);

//                 setScreenshot(html);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchScreenshot();
//     }, [url]); // Add the url to the dependency array

//     return screenshot;
// };

// // Path: helper\scrapers\scrapHTML.ts