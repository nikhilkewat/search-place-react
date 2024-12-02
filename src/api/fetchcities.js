import axios from "axios";

const fetchCities = async (params) => {

    console.log(process.env)
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiHost = process.env.REACT_APP_API_HOST;

  const options = {
    method: "GET",
    url: apiUrl,
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
   params
  };

  try {
    const response = await axios.request(options);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
};

export default fetchCities;