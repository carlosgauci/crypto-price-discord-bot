const axios = require("axios");

const fetchCoin = async (id) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: id,
        price_change_percentage: "24h,30d,1y",
      },
    }
  );

  if (response.data.length > 0) {
    return response.data[0];
  } else return "not found";
};

module.exports = {
  fetchCoin,
};
