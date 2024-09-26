"use client";
import { useState } from "react";
import {useRouter} from "next/navigation"; 

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
	]);

	// ativa e desativa o checkbox
	const toggleTaskStatus = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

    const router = useRouter();

	return (
		<main className="container mx-auto p-4">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold mb-4 text-current">
					Lista de Tarefas
				</h1>
				<Button id="close" onClick={() => router.push("http://localhost:3000")}>Sair</Button>
			</div>
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
