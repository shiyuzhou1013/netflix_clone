import axios from "axios";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };
  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Fail to fetch from TMDB" + response.statusText);
  }

  return response.data;
};
