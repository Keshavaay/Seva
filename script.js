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

function calculateItem(type) {
    const quantityElement = document.getElementById(`quantity_${type}`);
    const quantity = parseInt(quantityElement.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Calculate total cost for this item
    const pricePerBox = prices[type];
    const totalCost = pricePerBox * quantity;

    // Update the individual item total
    itemTotals[type] = totalCost;

    // Display the result
    document.getElementById(`result_${type}`).innerText = "Total Cost: ₹" + totalCost;
}

// Calculate and display the grand total of all items
function totalify() {
    const grandTotal = Object.values(itemTotals).reduce((acc, curr) => acc + curr, 0);
    document.getElementById("grand_total").innerText = "Grand Total: ₹" + grandTotal;
}
