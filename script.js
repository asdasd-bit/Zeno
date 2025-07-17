const chat = document.getElementById("chat");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  // Show user message
  chat.innerHTML += `<div class="user">You: ${msg}</div>`;
  chat.scrollTop = chat.scrollHeight;

  // Typing animation
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.textContent = "Bot: typing...";
  chat.appendChild(botDiv);
  chat.scrollTop = chat.scrollHeight;

  // Call OpenRouter API
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: "You are a kind, smart mental health assistant called MindWave." },
        { role: "user", content: msg }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Something went wrong.";

  botDiv.textContent = "Bot: " + reply.trim();
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}
