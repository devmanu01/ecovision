import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const key = process.env.GEMINI_API_KEY;
    console.log("Key uses:", key?.substring(0, 5) + "...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-live-preview:generateContent?key=\${key}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "hello" }] }],
      })
    });
    
    const data = await resp.json();
    console.log("Status:", resp.status);
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err: any) {
    console.error("Error detailing:", err.message);
  }
}

test();
