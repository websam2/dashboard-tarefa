import { CalendarForm } from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { useRef } from "react";

import type { ConfettiRef } from "@/components/ui/confetti";
import Confetti from "@/components/ui/confetti";
interface AddTaskFormProps {
	onAddTask: (title: string, description: string, date: Date) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState<Date | undefined>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title && description && date) {
			onAddTask(title, description, date);
			setTitle("");
			setDescription("");
			setDate(undefined);
		}
	};

	const handleDateSelect = (selectedDate: Date) => {
		setDate(selectedDate);
	};

	const confettiRef = useRef<ConfettiRef>(null);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Descreva sua Tarefa </CardTitle>
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
					<CalendarForm onDateSelect={handleDateSelect} />
					<Button type="submit" disabled={!title || !description || !date}>
					<Confetti
				ref={confettiRef}
				className="absolute left-0 top-0 z-0 size-full"
				onMouseEnter={() => {
					confettiRef.current?.fire({});
				}}
			/>
						Adicionar Tarefa
					</Button>
				</form>
				
			</CardContent>
			
		</Card>
	);
}
