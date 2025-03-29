import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [goal, setGoal] = useState("");
	const [days, setDays] = useState("");
	const [experience, setExperience] = useState("");
	const [plan, setPlan] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const generatePlan = async () => {
		setLoading(true);
		setError("");
		setPlan("");

		try {
			const response = await axios.post("http://localhost:4000/generate-plan", {
				age,
				weight,
				goal,
				days,
				experience,
			});
			setPlan(response.data.plan);
		} catch (err) {
			console.error(err);
			// Check if we got a response from the server
			if (err.response && err.response.data) {
				setError(err.response.data.error || "Something went wrong.");
			} else {
				setError("Network error");
			}
		}

		setLoading(false);
	};

	return (
		<div className="border-2">
			<h1>Workout Plan Generator</h1>
			<input
				type="text"
				placeholder="Age"
				value={age}
				onChange={(e) => setAge(e.target.value)}
			></input>
			<input
				type="text"
				placeholder="weight"
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
			/>
			<input
				type="text"
				placeholder="goal"
				value={goal}
				onChange={(e) => setGoal(e.target.value)}
			/>
			<input
				type="text"
				placeholder="days"
				value={days}
				onChange={(e) => setDays(e.target.value)}
			/>
			<input
				type="text"
				placeholder="experience"
				value={experience}
				onChange={(e) => setExperience(e.target.value)}
			/>
			<button onClick={generatePlan} disabled={loading}>
				{loading ? "Generating Plan..." : "Generate Plan"}
			</button>

			{error && <p className="text-red-600">{error}</p>}

			{plan && (
				<div className="border-2 rounded">
					<h2>Your Workout Plan</h2>
					<p>{plan}</p>
				</div>
			)}
		</div>
	);
}
export default App;
