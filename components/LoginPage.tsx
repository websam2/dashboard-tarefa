"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import teamChecklist from "../app/assets/team checklist.svg";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	//vai para a página principal ao fazer o login
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
		<main className="flex flex-col justify-center md:flex-row min-h-screen">
			<section className="hidden md:flex md:w-1/2 items-center justify-center bg-primary p-4">
				<Image
					src={teamChecklist}
					alt="Checklist"
					className="w-full max-w-md h-auto"
					width={400}
					height={400}
				/>
			</section>

			<section className="flex w-full h-screen md:w-1/2 items-center justify-center bg-primary-foreground p-4">
				<Card className="w-full max-w-md">
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
							<div>
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
							<Button type="submit" className="w-full">
								Entrar
							</Button>
						</form>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
