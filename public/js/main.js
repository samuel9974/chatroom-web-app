document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const sender = document.getElementById("sender").value;
  const content = document.getElementById("content").value;

  try {
    const response = await fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, content }),
    });

    if (response.ok) {
      // Reload page to show new message
      location.reload();
    } else {
      alert("Error sending message");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error sending message");
  }
});

async function deleteMessage(id) {
  if (!confirm("Are you sure you want to delete this message?")) return;

  try {
    const response = await fetch(`/messages/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.querySelector(`[data-id="${id}"]`).remove();
    } else {
      alert("Error deleting message");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error deleting message");
  }
}
