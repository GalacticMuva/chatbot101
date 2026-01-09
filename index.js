
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

while (info !== "exit") {

    info = input("Ask Bartok a question (or type 'exit' to quit): ");
    
        if (info.toLowerCase() === "exit") break;

    const msg = { 
        role: "user", 
        content : info 
    };

    messages.push(msg);

    const result = await run(apiModel, messages);

if (result && result.success) {
      const aiResponse = result.result.response;
       console.log(`Bartok: ${aiResponse}`);
      const assistantMsg = {
            role: "assistant",
            content: aiResponse
        };

        messages.push(assistantMsg);
    } else {
                console.log("[Error] Could not reach the Palace. Check your Account ID and Token.");
    }
}
// Function to run the model with given input
async function run(model, msg) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`,
      {
        headers: { 
            Authorization: `Bearer ${apiToken}`, 
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ messages: msg }),
      }
    );
    return await response.json();
  } catch (error) {
    return { success: false };
  }
}