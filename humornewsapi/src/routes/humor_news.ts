import { Hono } from "hono";
import axios from "axios";
import OpenAI from "openai";

const app = new Hono();

// API Keys
const newsAPIKey = "158f7ed38d5e42aea76930d43ecca9c8";
const geminiAPIKey = "AIzaSyBNKO4PkMS7mtw1M7AGp8_pjjM01GbJZ0I";

// Setup;
const aiModel = "gemini-1.5-flash"; // grok-beta...
const aiBaseURL = "https://generativelanguage.googleapis.com/v1beta/"; // https://api.x.ai/v1
const aiSystemPrompt =
    "YOUR ENTIRE PURPOSE IS TO MAKE EVERY NEWS FUNNY! YOU WILL BE GIVEN A NEWS OBJECT, ALL YOU HAVE TO DO IS RESPOND WITH A REALLY SAD VERSION OF IT. Don't make it sound like news, Make me cry";

// OpenAI Instance
let openAI = new OpenAI({
    apiKey: geminiAPIKey,
    baseURL: aiBaseURL,
});

// Get Headlines
async function getHeadlines() {
    // GET NEWS
    let response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${newsAPIKey}`
    );
    let articles = response.data.articles;
    return articles;
}

// Make Funny News with AI
async function makeFunnyNewsWithAI(context: any) {
    const result = await openAI.chat.completions.create({
        model: aiModel,
        messages: [
            { role: "system", content: aiSystemPrompt },
            {
                role: "user",
                content: JSON.stringify(context),
            },
        ],
    });
    let aiResponse = result.choices[0].message.content;
    return aiResponse;
}

app.get("/normal", async (c) => {
    let articles = await getHeadlines();
    return c.json(articles);
});

app.post("/funny", async (c) => {
    let body = await c.req.json();
    let funnyNews = await makeFunnyNewsWithAI(body);
    return c.json(funnyNews);
});

export default app;
