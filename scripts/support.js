document.getElementById("support-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let issue = document.getElementById("issue").value;
    let ticketList = document.getElementById("ticket-list");
    
    if (ticketList.querySelector(".empty")) {
        ticketList.innerHTML = "";
    }
    
    let li = document.createElement("li");
    li.innerHTML = `<strong>${name} (${email}):</strong> ${issue}`;
    ticketList.appendChild(li);
    
    document.getElementById("support-form").reset();
});