require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const { fetchCoin } = require("./fetchCoin.js");

const COMMAND_PREFIX = "!";
const COMMAND_NAME = "price";

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

    if (commandName === COMMAND_NAME) {
      try {
        const coin = await fetchCoin(commandBody);
        if (typeof coin === "string") {
          message.channel.send("Coin not found.");
        } else {
          const embed = new MessageEmbed()
            .setColor("#00853c")
            .setAuthor({
              name: `${coin.name} (${coin.symbol.toUpperCase()})`,
              iconURL: coin.image,
            })
            .addField("Price", `$${coin.price.toLocaleString()}`, true)
            .addField(
              "24h",
              `${coin.change > 0 ? "+" : ""}${coin.change.toFixed(2)}%`,
              true
            );

          message.channel.send({ embeds: [embed] });
        }
      } catch (error) {
        message.channel.send("Couldn't fetch data.");
      }
    } else message.channel.send("Command not found.");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
