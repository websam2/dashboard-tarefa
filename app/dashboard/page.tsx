"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";

import { Button } from "@/components/ui/button";

interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

export default function DashboardPage() {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}
	}, []);

	const saveTasks = (updatedTasks: Task[]) => {
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
		console.log("Tarefas salvas:", updatedTasks);
	};

	const addTask = (title: string, description: string) => {
		const newTask: Task = {
			id: Date.now(),
			title,
			description,
			completed: false,
		};
		const updatedTasks = [...tasks, newTask];
		saveTasks(updatedTasks);
	};

	const toggleTaskStatus = (id: number) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
		saveTasks(updatedTasks);
	};

	const deleteTask = (id: number) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		saveTasks(updatedTasks);
	};

	return (
		<main className="container mx-auto p-4">
			<Link href="/" className="flex items-center justify-between p-4">
				<h1 className="text-3xl font-bold text-primary">DASHBOARD</h1>
				<Button>Sair</Button>
			</Link>
			<section className="space-y-8">
				<div>
					<AddTaskForm onAddTask={addTask} />
				</div>
				<div>
					<TaskList
						tasks={tasks}
						onToggleStatus={toggleTaskStatus}
						onDeleteTask={deleteTask}
					/>
				</div>
			</section>
		</main>
	);
}
