document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "../../login.html"; // Redirect if not logged in
        return;
    }

    try {
        const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/customer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const packageContainer = document.querySelector(".worker_input"); // This matches where the packages should go
            packageContainer.innerHTML = "<h2>Your Packages</h2>";

            if (data.length === 0) {
                packageContainer.innerHTML += "<p>No packages found.</p>";
            } else {
                data.forEach(pkg => {
                    const packageElement = document.createElement("div");
                    packageElement.classList.add("package-item");
                    packageElement.innerHTML = `
                        <p><strong>Package ID:</strong> ${pkg.package_id}</p>
                        <p><strong>From:</strong> ${pkg.address_from}</p>
                        <p><strong>To:</strong> ${pkg.address_to}</p>
                        <p><strong>Weight:</strong> ${pkg.weight} kg</p>
                        <p><strong>Status:</strong> ${pkg.status}</p>
                    `;
                    packageContainer.appendChild(packageElement);
                });
            }
        } else {
            document.querySelector(".worker_input").innerHTML = `<p>Error fetching packages: ${data.message}</p>`;
        }
    } catch (error) {
        console.error("Error fetching packages:", error);
        document.querySelector(".worker_input").innerHTML = "<p>Server error. Please try again later.</p>";
    }
});