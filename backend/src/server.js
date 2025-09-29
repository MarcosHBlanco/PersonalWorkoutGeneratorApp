import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// ── 1) Enable CORS for all routes and all origins ─────────────────────────────
app.use(cors());
app.options("*", cors());

// ── 2) JSON parser ──────────────────────────────────────────────────────────────
app.use(express.json());

// ── 3) OpenAI client ────────────────────────────────────────────────────────────
const client = new OpenAI();

// ── 4) Endpoint ────────────────────────────────────────────────────────────
app.post("/generate-plan", async (req, res) => {
	const { age, weight, goal, days, experience, healthIssues, comments } =
		req.body;
	const prompt = `Analyse ${healthIssues} and ${comments} of the user. Create a personalized ${days}-day workout plan for someone who is ${age} years old, weighs ${weight}kg, has a fitness goal of "${goal}", and has ${experience} experience level.
	Also, make it very readable. Separate Days with "***" symbols. Let the user know what that day is about, which muscle group he is going to be working ( upper body, lower, mix...) For example , use this template: "*** Day 1 (jump line here) ** Exercise 1: (jump line here)... *** Day 2 ** Exercise 2: ... " This is to make it easier for me to manipulate. Do not include on your reply anything besides the workout plan`;

	try {
		const completion = await client.chat.completions.create({
			model: "gpt-5",
			messages: [{ role: "user", content: prompt }],
		});
		res.json({ plan: completion.choices[0].message.content });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate workout plan." });
	}
});

// ── 5) Listen PORT ───────────────────────────────────────────────────
const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
