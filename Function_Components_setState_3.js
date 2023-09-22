import React, { useState } from "react";
import NewTask from "../Presentational/NewTask";
import TasksList from "../Presentational/TasksList";

// ==== App.js ====================================================================================
export default function App() {
	const [newTask, setNewTask] = useState({});
	const [allTasks, setAllTasks] = useState([]);

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setNewTask((prev) => ({
			...prev,
			id: Date.now(),
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newTask.title) return;
		setAllTasks((prev) => [newTask, ...prev]);
		setNewTask({});
	};

	const handleDelete = (taskIdToRemove) => {
		setAllTasks((prev) => prev.filter((task) => task.id !== taskIdToRemove));
	};

	return (
		<main>
			<h1>Tasks</h1>
			<NewTask
				newTask={newTask}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			<TasksList allTasks={allTasks} handleDelete={handleDelete} />
		</main>
	);
}




// ==== NewTask.js ====================================================================================
import React from "react";

export default function NewTask({ newTask, handleChange, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<input
				name="title"
				placeholder="New task"
				value={newTask.title || ""}
				onChange={handleChange}
			/>
			{!newTask.title ? null : (
				<>
					<textarea
						name="description"
						placeholder="Details..."
						value={newTask.description || ""}
						onChange={handleChange}
					/>
					<button type="submit">Add Task</button>
				</>
			)}
		</form>
	);
}




// ==== TaskList.js ====================================================================================
import React from "react";

export default function TasksList({ allTasks, handleDelete }) {
	return (
		<ul>
			{allTasks.map(({ title, description, id }) => (
				<li key={id}>
					<div>
						<h2>{title}</h2>
						<button onClick={() => handleDelete(id)}>X</button>
					</div>
					{!description ? null : <p>{description}</p>}
				</li>
			))}
		</ul>
	);
}
