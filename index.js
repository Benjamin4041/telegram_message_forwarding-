
const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { NewMessage, NewMessageEvent } = require("telegram/events");
const fs = require("fs");


require("dotenv").config();

console.log("working...");

let client;

async function handler(event) {
  let str = event.message.message;
  console.log(str);
  if(str.includes('from benjamin')){
    await client.sendMessage("me", { message: str });
  }
  await client.sendMessage("-1002418113283", { message: str });
  
}

function telegramMessage() {
  const apiId = process.env.telegram_APIId * 1;
  const apiHash = process.env.telegram_APIHash;
  const stringSession = new StringSession(process.env.Session);

  (async () => {
    console.log("Loading interactive example...");
     client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: process.env.mobile,
      password: process.env.telegram_Password,
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    client.sen
    console.log("You should now be connected.");
    let session = client.session.save();
    // the if statment below if for adding the session to the .env file
    if (!process.env.Session) {
      fs.appendFile(".env", `\nSession = ${session}`, (err) => {
        if (err) {
          console.error("Error appending to .env:", err);
        } else {
          console.log("Environment variable added to .env file!");
        }
      });
    }
    console.log(session);
    
    client.addEventHandler(
      handler,
      new NewMessage({
        chats: ["@kaganandhiscryptobestfriends","-1002000016806"],
      }))

    client.addEventHandler(
      handler,
      new NewMessage({
        fromUsers: [7080143630n,6871303843n],
      }))
  })();
}
telegramMessage();