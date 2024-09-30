import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/types/index";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onMoveTask: (id: number, direction: "up" | "down") => void;
}

export default function TaskList({
  tasks,
  onToggleStatus,
  onDeleteTask,
  onMoveTask,
}: TaskListProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "Data não disponível";
    return date.toLocaleDateString();
  };

  return (
    <section className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Nenhuma tarefa encontrada.
        </p>
      ) : (
        tasks.map((task, index) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{task.title}</span>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => onToggleStatus(task.id)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onMoveTask(task.id, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onMoveTask(task.id, "down")}
                    disabled={index === tasks.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Data: {formatDate(task.date)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Status: {task.completed ? "Concluída" : "Pendente"}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </section>
  );
}