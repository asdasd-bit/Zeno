async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user-msg">🧍 ${msg}</div>`;
  input.value = "";

  chat.innerHTML += `<div class="bot-msg">🤖 Typing...</div>`;
  chat.scrollTop = chat.scrollHeight;

  const apiKey = "sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx"; // ← your OpenRouter key

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/google/gemma-7b-it",
        messages: [
          { role: "system", content: "You are a kind and smart AI assistant." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await res.json();
    const botResponse = data.choices?.[0]?.message?.content || "⚠️ Sorry, I couldn't understand that.";

    // Remove typing and show actual response
    const botMsgs = document.querySelectorAll(".bot-msg");
    botMsgs[botMsgs.length - 1].remove();
    chat.innerHTML += `<div class="bot-msg">🤖: ${botResponse}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    console.error(err);
    chat.innerHTML += `<div class="bot-msg">⚠️ Error contacting the API.</div>`;
  }
}
