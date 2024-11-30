import { serve } from "@hono/node-server";
import { Hono } from "hono";
import humorNews from "./routes/humor_news.js";

const app = new Hono();

// Introdution
app.get("/", (c) => {
    return c.text("Hello!");
});

// Get Humor News
app.route("/news", humorNews);

// Serve
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
