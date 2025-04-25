import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// ── 1) Enable CORS for all routes and all origins ─────────────────────────────
app.use(cors()); // adds Access-Control-Allow-Origin: *
app.options("*", cors()); // pre-flight for all routes

// ── 2) JSON parser ──────────────────────────────────────────────────────────────
app.use(express.json());

// ── 3) OpenAI client ────────────────────────────────────────────────────────────
const client = new OpenAI();

// ── 4) Your endpoint ────────────────────────────────────────────────────────────
app.post("/generate-plan", async (req, res) => {
	const { age, weight, goal, days, experience, healthIssues } = req.body;
	const prompt = `Analyse ${healthIssues} of the user. Create a personalized ${days}-day workout plan for someone who is ${age} years old, weighs ${weight}kg, has a fitness goal of "${goal}", and has ${experience} experience level.`;

	try {
		const completion = await client.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: "user", content: prompt }],
		});
		res.json({ plan: completion.choices[0].message.content });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate workout plan." });
	}
});

// ── 5) Listen on dynamic PORT ───────────────────────────────────────────────────
const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
