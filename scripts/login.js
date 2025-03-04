document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const resultElement = document.getElementById("login-result");

    if (!username || !password) {
        resultElement.textContent = "Please enter both username and password.";
        resultElement.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            resultElement.textContent = "Login successful! Redirecting...";
            resultElement.style.color = "green";
            localStorage.setItem("token", data.token); // Store JWT token
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect after login
            }, 2000);
        } else {
            resultElement.textContent = data.error || "Invalid credentials.";
            resultElement.style.color = "red";
        }
    } catch (error) {
        resultElement.textContent = "Error connecting to the server.";
        resultElement.style.color = "red";
    }
});

