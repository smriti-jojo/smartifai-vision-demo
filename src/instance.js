import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.humantic.ai/",
  baseURL:"https://big-five-personality-insights.p.rapidapi.com/api/"
});

export default instance;
