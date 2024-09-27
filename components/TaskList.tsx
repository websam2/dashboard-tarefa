"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";

interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

interface TaskListProps {
	tasks: Task[];
	onToggleStatus: (id: number) => void;
	onDeleteTask: (id: number) => void;
}

export default function TaskList({
	tasks,
	onToggleStatus,
	onDeleteTask,
}: TaskListProps) {
	return (
		<section className="space-y-4">
			{tasks.map((task) => (
				<Card key={task.id}>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>{task.title}</span>
							<div className="flex relative items-center space-x-2">
								<Checkbox
									checked={task.completed}
									onCheckedChange={() => onToggleStatus(task.id)}
								/>
								<Button
									className="bg-destructive absolute top-20 left-0 "
									size="icon"
									onClick={() => onDeleteTask(task.id)}
								>
									<Trash className="h-4 w-4" />
								</Button>
							</div>
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
	);
}
