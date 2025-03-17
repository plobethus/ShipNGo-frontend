document.getElementById("login-form").addEventListener("submit", async (event) => {
    // Event listener for login form submission
    event.preventDefault(); // Prevents default form submission behavior

    // Extract email and password values from input fields
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageElement = document.getElementById("message");

    messageElement.innerText = ""; // Clear previous messages

    // Validate input
    if (!email || !password) {
        messageElement.innerText = "Please enter both email and password.";
        return;
    }

    try { 
        // Send POST request to backend /auth/login
        const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }), // Sends email and password to backend
        });

        const data = await response.json();
        
        // If login is successful, store the token and redirect
        if (response.ok) {
            sessionStorage.setItem("token", data.token); // Store JWT token
            sessionStorage.setItem("role", data.role); // Store role
            if (data.role === "customer") {
              window.location.href = "customer.html"; // Redirects to customer page in the correct path
            } else if (data.role === "employee") {
              window.location.href = "employee.html"; // Redirects to employee page in the correct path
            }
        } else {
            messageElement.innerText = data.message || "Login failed. Please try again.";
        }
    } catch (error) {
        messageElement.innerText = "Network error. Please try again later.";
        console.error("Login error:", error);
    }
});
