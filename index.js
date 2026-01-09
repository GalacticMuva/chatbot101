
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
    content: "You are a AI agent who solves questions about the movie Anastasia (1997)."
  }
];

// Main interaction loop

while (info != "exit") {

    info = input("Ask me a question about the movie Anastasia (1997) or type 'exit' to quit: ")
    
    const msg = { 
        role: "user", 
        content : "info" 
    };

    messages.push(msg);

    const result = await run(apiModel, messages);
    console.log(result.result.response);
}
// Function to run the model with given input
async function run(model, msg) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/13b4a647555cbb5b2ddd755d5192d28b/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer RtxVB9guhKNAXlH1r92x2gUlQ7gSqHcALCrOntIN" },
      method: "POST",
      body: JSON.stringify({messages: msg}),
    }
  );
  const result = await response.json();
  return result;
}