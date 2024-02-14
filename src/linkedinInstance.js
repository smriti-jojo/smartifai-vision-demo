import axios from "axios";

const linkedinInstance = axios.create({

baseURL:"https://linkedin-data-scraper.p.rapidapi.com/"
});

export default linkedinInstance;
