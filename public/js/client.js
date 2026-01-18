// Fetch and display messages when the chatroom page loads
window.addEventListener("DOMContentLoaded", fetchMessages);

// Logout function
async function logout() {
  await fetch("/logout", { method: "POST" });
  window.location.href = "/login";
}

async function sendMessage(event) {
  const messageInput = document.getElementById("messageInput");
  const content = messageInput.value.trim();
  if (content === "") return;
  // if (!content) return;

  try {
    // Send message to server
    const response = await fetch("/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      messageInput.value = "";
      // Refresh messages after sending a new one
      fetchMessages();
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

async function fetchMessages() {
  try {
    const response = await fetch("/chat/messages");
    if (response.ok) {
      const messages = await response.json();
      // Update the chat UI with fetched messages
      displayMessages(messages);
    } else if (response.status === 401) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

function displayMessages(messages) {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = messages
    .map(
      (message) => `
              <div class="d-flex ${message.isOwner ? "justify-content-end" : "justify-content-start"} mb-2">
                <div class="chat-bubble p-3 bg-primary text-white rounded-4 position-relative" style="word-break:break-word;white-space:pre-line;" >
            <div class="d-flex align-items-center mb-1">
                <span class="fw-bold me-2 ${message.isOwner ? "text-warning" : "text-info"}">${message.User.firstName}:</span>
              <small class="text-muted ms-auto">${new Date(message.timestamp).toLocaleString()}</small>
            </div>
            <div class="mb-1">${message.content}</div>
            ${
              message.isOwner
                ? `<div class="d-flex gap-1 justify-content-end mt-1">
                    <button class="btn btn-sm btn-outline-light border-0 px-2 py-1" onclick="deleteMessage(${message.id})" title="Delete"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-sm btn-outline-light border-0 px-2 py-1" onclick="editMessage(${message.id})" title="Edit"><i class="bi bi-pencil"></i></button>
                  </div>`
                : ""
            }
          </div>
        </div>
      `,
    )
    .join("");
  // Scroll to bottom to show latest messages
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
