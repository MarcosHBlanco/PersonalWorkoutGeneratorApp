import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [goal, setGoal] = useState("");
	const [days, setDays] = useState("");
	const [experience, setExperience] = useState("");
	const [healthIssues, setHealthIssues] = useState("");
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
				healthIssues,
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
		<div className="bg-neutral-100-50 text-black flex flex-col justify-around place-items-center">
			<h1 className="text-4xl text-slate-800 ">
				Personal Workout Plan Generator
			</h1>
			<div className="border-2 rounded m-3 flex flex-col place-items-center">
				<div className="grid grid-cols-2 w-full gap-4">
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					></input>
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Weight"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Goal"
						value={goal}
						onChange={(e) => setGoal(e.target.value)}
					/>
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Days"
						value={days}
						onChange={(e) => setDays(e.target.value)}
					/>
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Experience"
						value={experience}
						onChange={(e) => setExperience(e.target.value)}
					/>
					<input
						className="m-2 border rounded border-b-gray-900"
						type="text"
						placeholder="Health issues"
						value={healthIssues}
						onChange={(e) => setHealthIssues(e.target.value)}
					/>
				</div>
				<button
					className="text-slate-900 m-2 border rounded border-slate-900 w-1/3 font-semibold hover:bg-slate-900 hover:text-white transition"
					onClick={generatePlan}
					disabled={loading}
				>
					{loading ? "Generating Plan..." : "Generate Plan"}
				</button>
				<div className="m-3">
					{error && <p className="text-red-600">{error}</p>}

					{plan && (
						<div className="border rounded border-b-blue-900">
							<h2 className="text-2xl text-slate-800 m-2">Your Workout Plan</h2>
							{plan.split("###").map((paragraph, index) => (
								<p key={index} className="m-3">
									{paragraph}
								</p>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default App;
