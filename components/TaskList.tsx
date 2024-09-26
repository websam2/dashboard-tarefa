"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

export default function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: 1,
			title: "Tarefa 1",
			description: "Descrição da tarefa 1",
			completed: false,
		},
		{
			id: 2,
			title: "Tarefa 2",
			description: "Descrição da tarefa 2",
			completed: true,
		},
	]);

	// ativa e desativa o checkbox
	const toggleTaskStatus = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
			<section className="space-y-4">
				{tasks.map((task) => (
					<Card key={task.id}>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<span>{task.title}</span>
								<Checkbox
									checked={task.completed}
									onCheckedChange={() => toggleTaskStatus(task.id)}
								/>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{task.description}</p>
							<p className="mt-2 text-sm text-gray-500">
								Status: {task.completed ? "Concluída" : "Pendente"}
							</p>
						</CardContent>
					</Card>
				))}
			</section>
		</main>
	);
}
