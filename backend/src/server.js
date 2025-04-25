import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // allow any origin
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	// if this is a pre-flight request, end it here
	if (req.method === "OPTIONS") return res.sendStatus(204);
	next();
});

app.use(express.json());

const client = new OpenAI();

app.post("/generate-plan", async (req, res) => {
	const { age, weight, goal, days, experience, healthIssues } = req.body;

	const prompt = `Analyse ${healthIssues} of the user. Create a personalized ${days}-day workout plan for someone who is ${age} years old, weighs ${weight}kg, has a fitness goal of "${goal}", and has ${experience} experience level.`;

	try {
		const completion = await client.chat.completions.create({
			model: "gpt-4o", // You can change this to "gpt-3.5-turbo" or another model if desired
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		});

		res.json({ plan: completion.choices[0].message.content });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to generate workout plan." });
	}
});

const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
