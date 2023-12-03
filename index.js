// Import required modules
import express from "express";  
import axios from "axios";  
import bodyParser from "body-parser"; 

const app = express(); 
const port = 3000;  


const API_URL = "http://api.weatherstack.com"; 
const endPoit = "/current";  
const bearerToken = "XXXXXX";  // API access token - (use your Bearer Token, you can get it after signing up at "https://weatherstack.com/documentation")



app.use(express.static("public"));  
app.use(bodyParser.urlencoded({ extended: true }));  

function dateAndTimePicker() {
  var arr = [];
  var date = new Date();

  var day = date.getDay();
  var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var month = date.getMonth();
  var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = (`${hours}:${minutes}:${seconds}`);

  arr[0] = dayName[day];
  arr[1] = monthName[month];
  arr[2] = year;
  arr[3] = time;

  return arr; 
}

// Define routes

app.get("/", (req, res) => {
  res.render("index.ejs"); 
});

// Route for handling weather data submission
app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;  
  var dateAndTime = dateAndTimePicker(); 
  
  try {
    const response = await axios.get(API_URL + endPoit, {
      params: {
        query: cityName,
        access_key: bearerToken
      }
    });

    
    res.render("feature.ejs", {
      allData: response.data,
      date: dateAndTime
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    
   
    res.render("feature.ejs", {
      error: ("Oops! ," + error.message)
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
