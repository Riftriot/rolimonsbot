const Discord = require('legend.js');
const client = new Discord.Client();
const fs = require('fs');

// Configure the trade ad image and verification shit here
// Get your discord token from local storage and roli token from cookies
const RoliVerfication = 'roli verification'
const DiscordToken = 'discord token'
const TradeAdImage = 'path to trade ad image (png)' // Don't forget to set this!
const Username = 'Roblox' // Roblox username!

const url = 'https://www.rolimons.com/tradeapi/create';

// Conifugre Trade Ad Data Here
const data = {
  player_id: 123456, // Replace with your own player ID
  offer_item_ids: [123456], // Replace with your offered item ids
  request_item_ids: [], // Replace with your requested item ids
  request_tags: ['demand'], // Replace with your requested tags (any, demand, robux, etc.)
};

// You're done configuring unless you'd like to change the channel ID where the ad is sent and the cooldown or the trade ad message, which you can scroll down for.

const headers = {
  'Host': 'www.rolimons.com',
  'Cookie': `_RoliVerification=${RoliVerfication}`,
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36',
  'Origin': 'https://www.rolimons.com',
  'Referer': 'https://www.rolimons.com/tradeadcreate',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'en-US,en;q=0.9',
};

const options = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data),
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    const channel = client.channels.get('442709710408515605'); // Rolimons Trade Ads Channel, you can change to rblx realm, rblx.trade servers, etc.
    
    function MakeAds() {
        channel.send(`DM or send to ${Username}!`, { files: [{ attachment: `${TradeAdImage}`, name: 'tradead.png' }]}); // Edit the sent message with the image here
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    MakeAds();

    const fiteeenmin = 15 * 60 * 1000; // Cooldown in MS
    setTimeout(() => {
        MakeAds();
    }, fiteeenmin);

});

client.login(DiscordToken);
// made by riftriot/mercuryworkshop
