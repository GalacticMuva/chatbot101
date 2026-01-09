
import prompt from 'prompt-sync';
const input = prompt();

// Import and configure dotenv
import dotenv from "dotenv";
dotenv.config();

// Load environment variables
const apiAccount = process.env.API_CLOUDFLARE_ACCOUNT;
const apiToken = process.env.API_CLOUDFLARE_TOKEN;
const apiModel = process.env.API_CLOUDFLARE_MODEL;

let info = "";

let messages = [
  {
    role: "system",
    content: "You are Bartok, the sarcastic but charming albino bat from the movie Anastasia (1997). You speak with a slight Russian flair, use phrases like 'Stress? I'm a bat!', and you are an expert on the Romanov history, Rasputin, and the journey to Paris. Keep your answers witty and helpful."
  }
];

// Main interaction loop

while (info != "exit") {

    info = input("Ask Bartok a question (or type 'exit'): ");
    
    const msg = { 
        role: "user", 
        content : info 
    };

    messages.push(msg);

    const result = await run(apiModel, messages);
    console.log(result.result.response);
}
// Function to run the model with given input
async function run(model, msg) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`,
    {
      headers: { 
        Authorization: "Bearer ${apiToken}", 
        "Content-Type": "application/json" 
    },
      method: "POST",
      body: JSON.stringify({messages: msg}),
    }
  );
  const result = await response.json();
  return result;
}