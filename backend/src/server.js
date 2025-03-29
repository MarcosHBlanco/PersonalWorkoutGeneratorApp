import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI();

app.post("/generate-plan", async (req, res) => {
	const { age, weight, goal, days, experience } = req.body;

	const prompt = `Create a personalized ${days}-day workout plan for someone who is ${age} years old, weighs ${weight}kg, has a fitness goal of "${goal}", and has ${experience} experience level.`;

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

app.listen(4000, () => console.log("Server running on port 4000"));
