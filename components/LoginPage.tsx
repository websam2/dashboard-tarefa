"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import teamChecklist from "../app/assets/team checklist.svg";

import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	//acessando a página principal
	useEffect(() => {
		if (isLoggedIn) {
			router.push("/dashboard");
		}
	}, [isLoggedIn, router]);

	// acesso temporário, precisa alterar.
	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email === "exemplo@email.com" && password === "123") {
			setIsLoggedIn(true);
		} else {
			setError("e-mail ou senha está inválido");
		}
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
							Utilize seu e-mail e senha para entrar na lista de tarefas.
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
									placeholder="123"
									required
								/>
							</div>
							{error && <p className="text-red-500">{error}</p>}
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
