import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


interface AddTaskFormProps {
	onAddTask: (title: string, description: string) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onAddTask(title, description);
		setTitle("");
		setDescription("");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Descreva sua Tarefa</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						placeholder="Título da tarefa"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<Textarea
						placeholder="Descrição da tarefa"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<Button type="submit">Adicionar Tarefa</Button>
				</form>
			</CardContent>
		</Card>
	);
}
