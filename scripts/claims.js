document.getElementById("support-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const issue = document.getElementById("issue").value.trim();
    const messageElement = document.getElementById("message");
  
    messageElement.innerText = "";
  
    if (!name || !email || !issue) {
      messageElement.innerText = "Please fill in all fields.";
      return;
    }
    
    try {
      const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, issue })
      });
      const data = await response.json();
      if (response.ok) {
        messageElement.innerText = "Support ticket submitted successfully.";
        loadSupportTickets();
        document.getElementById("support-form").reset();
      } else {
        messageElement.innerText = data.message || "Failed to submit ticket. Try again.";
      }
    } catch (error) {
      messageElement.innerText = "Network error. Please try again later.";
      console.error("Support ticket error:", error);
    }
  });
  
  async function loadSupportTickets() {
    const ticketList = document.getElementById("ticket-list");
    ticketList.innerHTML = "<li>Loading tickets...</li>";
  
    try {
      const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/support/tickets");
      const tickets = await response.json();
      ticketList.innerHTML = "";
      if (tickets.length === 0) {
        ticketList.innerHTML = "<li class='empty'>No support tickets yet.</li>";
      } else {
        tickets.forEach(ticket => {
          let li = document.createElement("li");
          li.innerHTML = `<strong>${ticket.name} (${ticket.email}):</strong> ${ticket.issue}`;
          ticketList.appendChild(li);
        });
      }
    } catch (error) {
      ticketList.innerHTML = "<li>Error loading tickets.</li>";
      console.error("Error fetching tickets:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadSupportTickets);