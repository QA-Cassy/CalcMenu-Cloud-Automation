import fs from 'fs';

export function generateProductName() {
    const counterFile = './data/counter.json';

    // Generate the product name
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).toString().slice(-2);
    const todayStr = `${yy}-${mm}-${dd}`; // e.g., "25-12-12"

    // Read the current counter
    let counterData = JSON.parse(fs.readFileSync(counterFile, 'utf8'));

    // Reset counter if date changed
    if (counterData.lastDate !== todayStr) {
        counterData.productCounter = 1;
        counterData.lastDate = todayStr;
    }

    // Use counter
    let i = counterData.productCounter;
    const productName = `QA Product ${mm}/${dd}/${yy}-${i}`;

    // Increment and save the new counter value
    counterData.productCounter = i + 1;
    fs.writeFileSync(counterFile, JSON.stringify(counterData, null, 2));

    return productName;
}
