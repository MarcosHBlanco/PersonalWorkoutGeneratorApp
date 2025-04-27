// src/components/WorkoutGenerator.jsx
import { useState } from "react";

export default function WorkoutGenerator({ onGenerate, plan }) {
	const [form, setForm] = useState({
		age: "",
		weight: "",
		goal: "",
		days: "",
		experience: "",
		healthIssues: "",
		comments: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await onGenerate(form);
		setLoading(false);
	};

	return (
		<div className="max-w-5xl mx-auto p-6 grid gap-8 md:grid-cols-2">
			{/* Form Card */}
			<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">
					Enter Your Details
				</h2>
				<div className="grid gap-4">
					{[
						{ name: "age", label: "Age" },
						{ name: "weight", label: "Weight (kg)" },
						{ name: "goal", label: "Goal (e.g. build muscle)" },
						{ name: "days", label: "Days per week" },
						{ name: "experience", label: "Experience level" },
						{ name: "healthIssues", label: "Health issues" },
						{ name: "comments", label: "Additional comments" },
					].map(({ name, label }) => (
						<div key={name} className="flex flex-col">
							<label className="mb-1 text-gray-600">{label}</label>
							<input
								name={name}
								value={form[name]}
								onChange={handleChange}
								className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
								placeholder={label}
							/>
						</div>
					))}
				</div>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className="mt-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
				>
					{loading ? "Generating…" : "Generate Plan"}
				</button>
			</div>

			{/* Plan Card */}
			<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">
					Your Workout Plan
				</h2>
				{plan ? (
					<div className="space-y-3 text-gray-700">
						{plan.split("###").map((p, i) => (
							<p key={i} className="leading-relaxed">
								{p}
							</p>
						))}
					</div>
				) : (
					<p className="text-gray-400">Fill out the form to see your plan.</p>
				)}
			</div>
		</div>
	);
}
