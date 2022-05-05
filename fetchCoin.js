const axios = require("axios");

const fetchCoin = async (id) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: id,
      },
    }
  );

  if (response.data.length > 0) {
    const {
      name,
      symbol,
      image,
      current_price: price,
      price_change_percentage_24h: change,
    } = response.data[0];

    return { id, name, symbol, image, price, change };
  } else return "not found";
};

module.exports = {
  fetchCoin,
};
