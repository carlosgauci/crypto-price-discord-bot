require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const { fetchCoin } = require("./fetchCoin.js");

const COMMAND_PREFIX = "!";
const COMMAND_PRICE = "price";
const COMMAND_DETAILS = "details";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(COMMAND_PREFIX)) {
    const [commandName, ...body] = message.content
      .toLowerCase()
      .trim()
      .substring(COMMAND_PREFIX.length)
      .split(/\s+/);
    const commandBody = body.join(" ");

    if (commandName === COMMAND_PRICE || commandName === COMMAND_DETAILS) {
      try {
        const coin = await fetchCoin(commandBody);
        if (typeof coin === "string") {
          message.channel.send("Coin not found.");
        } else {
          const {
            name,
            symbol,
            image,
            current_price: price,
            price_change_percentage_24h_in_currency: change24h,
            price_change_percentage_30d_in_currency: change30d,
            price_change_percentage_1y_in_currency: change1y,
            market_cap_rank: rank,
            market_cap,
            total_supply,
            circulating_supply,
            max_supply,
            ath,
          } = coin;
          if (commandName === COMMAND_PRICE) {
            const embed = new MessageEmbed()
              .setColor("#00853c")
              .setAuthor({
                name: `${name} (${symbol.toUpperCase()})`,
                iconURL: image,
              })
              .addField("Price", `$${price.toLocaleString()}᲼᲼᲼`, true)
              .addField(
                "᲼24h",
                `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%`,
                true
              );

            message.channel.send({ embeds: [embed] });
          }

          if (commandName === COMMAND_DETAILS) {
            const embed = new MessageEmbed()
              .setColor("#00853c")
              .setAuthor({
                name: `${name} (${symbol.toUpperCase()})`,
                iconURL: image,
              })
              .addFields(
                {
                  name: "Rank",
                  value: `${rank}`,
                },
                {
                  name: "Market Cap",
                  value: `$${market_cap.toLocaleString()}`,
                },
                {
                  name: "Circulating Supply",
                  value: `${
                    circulating_supply
                      ? circulating_supply.toLocaleString()
                      : "--"
                  } `,
                },
                {
                  name: "Total Supply",
                  value: `${
                    total_supply ? total_supply.toLocaleString() : "--"
                  }`,
                },
                {
                  name: "Max Supply",
                  value: `${max_supply ? max_supply.toLocaleString() : "--"}`,
                },
                {
                  name: "All Time High",
                  value: `$${ath ? ath.toLocaleString() : "--"}`,
                },
                {
                  name: "Current Price",
                  value: `$${price.toLocaleString()}`,
                }
              )
              .addField(
                "᲼24h",
                `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%᲼᲼`,
                true
              )
              .addField(
                "᲼᲼30d",
                `${change30d > 0 ? "+" : ""}${change30d.toFixed(2)}%᲼᲼`,
                true
              )
              .addField(
                "᲼᲼1y",
                `${change1y > 0 ? "+" : ""}${change1y.toFixed(2)}%᲼᲼`,
                true
              );

            message.channel.send({ embeds: [embed] });
          }
        }
      } catch (error) {
        message.channel.send("Couldn't fetch data.");
        console.log(error);
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
