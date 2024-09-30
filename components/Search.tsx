import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchTasksProps {
  onSearch: (query: string) => void;
}

export default function SearchTasks({ onSearch }: SearchTasksProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Pesquisar tarefas..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}