document.getElementById("submitShipment").addEventListener("click", function () {
    const shipmentData = {
      sender_id: document.getElementById("sender_id").value,
      recipient_id: document.getElementById("recipient_id").value,
      weight: document.getElementById("weight").value,
      dimensions: document.getElementById("dimensions").value,
      shipping_cost: document.getElementById("shipping_cost").value,
      delivery_date: document.getElementById("delivery_date").value
    };
  
    fetch("http://localhost:3000/shipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shipmentData)
    })
    .then(response => response.json())
    .then(data => alert("Shipment created successfully!"))
    .catch(error => console.error("Error:", error));
  });
  