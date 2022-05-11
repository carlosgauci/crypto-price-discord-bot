# Crypto Price Discord Bot

A simple discord bot that retrieves cryptocurrency prices from the Coingecko API.

![!price](https://i.imgur.com/px6JNQK.png)

![!details](https://i.imgur.com/zS2RyAY.png)

## Instructions

1. [Create a discord app](https://discord.com/developers/applications/), add a bot to your app, and get your bot token.

2. Replace the contents of the .env file in this repository with your bot token. `DISCORD_BOT_TOKEN=<YOUR TOKEN>`

3. Run `npm i` to install dependencies.

4. Run `npm start` to start the bot.

5. Add the bot to your discord server, and use `!price <coingecko id>` to fetch the current price of a coin, or `!details <coingecko id>` to fetch more details such as market cap and supply. eg: `!details bitcoin`, `!price ethereum`,

[Full list of Coingecko ids](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0)
