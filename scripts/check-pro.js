
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) process.env[key.trim()] = value.trim();
    });
} catch (e) { }

async function testModel(modelName) {
    console.log(`Testing: ${modelName}`);
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log(`PASS: ${modelName}`);
    } catch (e) {
        console.log(`FAIL: ${modelName} - ${e.message.split(']')[1] || e.message}`);
    }
}

async function main() {
    await testModel("gemini-pro");
    await testModel("gemini-1.0-pro");
}
main();
