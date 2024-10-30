// Price structure
const prices = {
    '1_4_regular': 350,
    '1_2_regular': 625,
    '1_regular': 1250,
    '1_4_corporate': 375,
    '1_2_corporate': 675,
    '1_corporate': 1300
};

// Stores individual totals for each item
const itemTotals = {
    '1_4_regular': 0,
    '1_2_regular': 0,
    '1_regular': 0,
    '1_4_corporate': 0,
    '1_2_corporate': 0,
    '1_corporate': 0
};

// Stores calculation history for each user session
let calculationHistory = {};

// Initialize user session
function startSession() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter your name to start the session.");
        return;
    }
    calculationHistory[username] = {};
    document.getElementById("user-history").style.display = "block";
    alert(`Welcome, ${username}!`);
}

// Function to calculate item cost and save to history
function calculateItem(type) {
    const quantityElement = document.getElementById(`quantity_${type}`);
    const quantity = parseInt(quantityElement.value);

    if (isNaN(quantity) || quantity < 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    const pricePerBox = prices[type];
    const totalCost = pricePerBox * quantity;

    itemTotals[type] = totalCost;

    // Update displayed result
    document.getElementById(`result_${type}`).innerText = "Total Cost: ₹" + totalCost;

    // Record calculation in history
    const username = document.getElementById("username").value.trim();
    if (!calculationHistory[username]) calculationHistory[username] = {};
    if (!calculationHistory[username][type]) calculationHistory[username][type] = [];
    calculationHistory[username][type].push(`Quantity: ${quantity}, Cost: ₹${totalCost}`);

    // Update history display
    updateHistoryDisplay(type);
}

// Function to update displayed history for an item
function updateHistoryDisplay(type) {
    const username = document.getElementById("username").value.trim();
    const historyDiv = document.getElementById(`history_${type}`);
    const historyData = calculationHistory[username][type] || [];
    historyDiv.innerHTML = "<h4>History:</h4>" + historyData.map(entry => `<p>${entry}</p>`).join("");
}

// Calculate and display the grand total of all items
function totalify() {
    const grandTotal = Object.values(itemTotals).reduce((acc, curr) => acc + curr, 0);
    document.getElementById("grand_total").innerText = "Grand Total: ₹" + grandTotal;
}

// Existing code...

async function totalify() {
    const grandTotal = Object.values(itemTotals).reduce((acc, curr) => acc + curr, 0);
    document.getElementById("grand_total").innerText = "Grand Total: ₹" + grandTotal;

    // Prepare data to send
    const username = document.getElementById("username").value.trim();
    const items = Object.keys(itemTotals).map(type => ({
        type: type,
        total: itemTotals[type],
        history: calculationHistory[username][type] || []
    }));

    // Send data to the server
    try {
        const response = await fetch('https://<your-render-app-url>/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, items }),
        });

        if (response.ok) {
            console.log('Calculation saved successfully');
        } else {
            console.error('Error saving calculation');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

