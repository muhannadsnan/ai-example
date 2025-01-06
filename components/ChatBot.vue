<template>
  <div class="chatbot">
    <h3>AI Chatbot with Nuxt.js</h3>
    <div class="chat-container">
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.sender === 'user' ? 'user-message' : 'bot-message']"
        >
          {{ msg.text }}
        </div>
      </div>
      <div class="input-container">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Ask something..."
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// State variables
const userInput = ref("");
const messages = ref([]);

import { useRuntimeConfig } from 'nuxt/app';
const config = useRuntimeConfig();

// Methods
const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // Add user message to the chat
  messages.value.push({ sender: "user", text: userInput.value });

  try {
    const response = await axios.post( '/api/chat',
      {
        model: "gpt-4",
        // model: "gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: `You are a helpful chatbot with knowledge about products and categories.`,
          },
          ...messages.value.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: userInput.value },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }
    );

    // Add bot's response to the chat
    const reply = response.data.choices[0].message.content;
    messages.value.push({ sender: "bot", text: reply });
  } catch (error) {
    console.error("Error communicating with ChatGPT:", error);
    messages.value.push({
      sender: "bot",
      text: "Oops, something went wrong. Please try again later.",
    });
  }

  // Clear the input field
  userInput.value = "";
};
</script>

<style scoped>
/* Same styles as before */
.chat-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
}

.user-message {
  background: #d1f5d3;
  text-align: right;
}

.bot-message {
  background: #f1f1f1;
}
</style>
