"use client"
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import teamChecklist from "../app/assets/team checklist.svg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export default function LoginPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ email, password });
	};

	return (
		<main className="flex items-center h-full w-full">
			<section className="flex justify-center w-1/2 ">
				<Image src={teamChecklist} alt="Checklist" className="w-full" />
			</section>

			<section className="flex justify-center items-center w-1/2 h-full bg-primary-foreground">
				<Card className="w-full h-80 max-w-xl">
					<CardHeader>
						<CardTitle className="text-2xl font-bold tracking-tighter text-center">
							Entre com sua conta
						</CardTitle>
						<CardDescription>
							Utilize seu e e-mail e senha para entrar na lista de tarefas.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin} className="space-y-4">
							<div>
								<Label htmlFor="email">E-mail</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="exemplo@email.com"
									required
								/>
							</div>
							<div className="mt-4">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="sua senha secreta"
									required
								/>
							</div>
							<Button type="submit" className="mt-6 w-full">
								Entrar
							</Button>
						</form>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
