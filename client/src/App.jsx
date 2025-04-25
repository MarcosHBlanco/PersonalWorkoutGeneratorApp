// src/App.jsx
import { useState } from "react";
import axios from "axios";
import WorkoutGenerator from "../src/WorkoutGenerator";

function App() {
	const [plan, setPlan] = useState("");

	const generatePlan = async (inputs) => {
		try {
			const API = import.meta.env.VITE_API_URL;
			const res = await axios.post(`${API}/generate-plan`, inputs);
			setPlan(res.data.plan);
		} catch {
			setPlan("Failed to load plan. Try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow py-8 mb-8">
				<h1 className="text-center text-4xl font-bold text-indigo-600">
					Personal Workout Generator
				</h1>
			</header>
			<WorkoutGenerator onGenerate={generatePlan} plan={plan} />
		</div>
	);
}

export default App;
