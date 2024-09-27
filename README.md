# Dashboard de Tarefas

Este projeto é um dashboard simples para gerenciamento de tarefas, construído com Next, Tailwind e Shadcn.

![alt text](/app/assets/demostracao.png)

## Funcionalidades

- Página de login 
- Dashboard com a listagem das tarefas
- Adição de novas tarefas
- Alternância do status das tarefas
- Deletar as tarefas adicionadas
- Interface responsiva

## Pré-requisito

- Node.js

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/websam2/dashboard-tarefa
   cd dashboard-tarefa
   ```

2. Instale a dependência:
   ```
   npm install
   ```

## Executando o projeto

1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

2. Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.

## Acesso do DashBoard (temporário)

Está escrino nas labels dos inputs:
Login: exemplo@email.com
Senha: 123

## Build para produção

```
npm run build
```

Iniciar o servidor de produção:

```
npm start
```

## Estrutura do projeto

- `/dashboard`: Página inicial para o cadastro das Tarefas.
- `/components`: 
-LoginPage "Login de acesso";
-AddTaskForm "Formulário para descrever a tarefa com Título e Descrição";
-TaskList "Tarefas que serão adicionadas".





