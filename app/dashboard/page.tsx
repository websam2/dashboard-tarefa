"use client";

import AddTaskForm from "@/components/AddTaskForm";
import { ModeToggle } from "@/components/ModeToggle";
import SearchTasks from "@/components/Search";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import type { Task } from "@/types/index";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
	const [showAddTaskForm, setShowAddTaskForm] = useState(false);

	const convertToDate = (dateString: string | Date | null): Date | null => {
		if (dateString === null) return null;
		if (dateString instanceof Date) return dateString;
		const date = new Date(dateString);
		return Number.isNaN(date.getTime()) ? null : date;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			try {
				const parsedTasks: Task[] = JSON.parse(savedTasks);
				const tasksWithDates = parsedTasks.map((task) => ({
					...task,
					date: convertToDate(task.date),
				}));
				setTasks(tasksWithDates);
				setFilteredTasks(tasksWithDates);
			} catch (error) {
				console.error("Erro ao carregar tarefas:", error);
				setTasks([]);
				setFilteredTasks([]);
			}
		}
	}, []);

	const saveTasks = (updatedTasks: Task[]) => {
		setTasks(updatedTasks);
		setFilteredTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	const addTask = (title: string, description: string, date: Date | null) => {
		const newTask: Task = {
			id: Date.now(),
			title,
			description,
			completed: false,
			date,
		};
		saveTasks([...tasks, newTask]);
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

	const moveTask = (id: number, direction: "up" | "down") => {
		const index = tasks.findIndex((task) => task.id === id);
		if (index === -1) return;

		const newTasks = [...tasks];
		const [movedTask] = newTasks.splice(index, 1);
		const newIndex = direction === "up" ? index - 1 : index + 1;

		newTasks.splice(newIndex, 0, movedTask);
		saveTasks(newTasks);
	};

	const handleSearch = (query: string) => {
		const lowercaseQuery = query.toLowerCase();
		const filtered = tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(lowercaseQuery) ||
				task.description.toLowerCase().includes(lowercaseQuery),
		);
		setFilteredTasks(filtered);
	};

	const { theme } = useTheme();
	const [color, setColor] = useState("#ffffff");

	useEffect(() => {
		setColor(theme === "dark" ? "#ffffff" : "#000000");
	}, [theme]);

	return (
		<div className="flex flex-col min-h-screen">
			<main className="container mx-auto flex-grow">
				<Particles
					className="absolute -z-50 inset-0"
					quantity={100}
					ease={80}
					color={color}
					refresh
				/>
				<header className="flex items-center justify-between">
					<h1 className="md:text-xl xl:text-3xl font-bold text-primary">
						GERENCIADOR DE TAREFAS
					</h1>
					<div className="flex flex-col items-end">
						<ModeToggle />
						<Button className="m-2" asChild>
							<Link href="/">Sair</Link>
						</Button>
					</div>
				</header>
				<section className="space-y-8">
					<SearchTasks onSearch={handleSearch} />
					<TaskList
						tasks={filteredTasks}
						onToggleStatus={toggleTaskStatus}
						onDeleteTask={deleteTask}
						onMoveTask={moveTask}
					/>
				</section>
			</main>
			<footer className="fixed bottom-0 left-0 right-0 border-t">
				<div className="container mx-auto p-4">
					{showAddTaskForm ? (
						<div className="space-y-4">
							<AddTaskForm onAddTask={addTask} />
							<Button
								onClick={() => setShowAddTaskForm(false)}
								className="w-full bg-destructive"
							>
								<ChevronDown className="mr-2 h-4 w-4" />
								Esconder Formulário
							</Button>
						</div>
					) : (
						<Button
							onClick={() => setShowAddTaskForm(true)}
							className="w-full bg-primary"
						>
							<ChevronUp className="mr-2 h-4 w-4" />
							Adicionar Nova Tarefa
						</Button>
					)}
				</div>
			</footer>
		</div>
	);
}
