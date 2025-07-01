import { useState, type FC, useRef } from "react";
import { List, Section, Cell, Button, Input } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";

interface Todo {
  id: number;
  text: string;
}

export const TodoPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddOrEdit = () => {
    const value = input.trim();
    if (!value) return;
    if (editId !== null) {
      setTodos((todos) => todos.map((todo) => (todo.id === editId ? { ...todo, text: value } : todo)));
      setEditId(null);
    } else {
      setTodos((todos) => [...todos, { id: Date.now(), text: value }]);
    }
    setInput("");
    inputRef.current?.focus();
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setInput(text);
    inputRef.current?.focus();
  };

  const handleDelete = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      setInput("");
    }
  };

  return (
    <Page>
      <Section header="Todo список">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите задачу..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddOrEdit();
          }}
        />
        <Cell>
          <Button onClick={handleAddOrEdit} size="m">
            {editId !== null ? "Изменить" : "Добавить"}
          </Button>
        </Cell>
        <List>
          {todos.length === 0 && <Cell>Нет задач</Cell>}
          {todos.map((todo) => (
            <Cell
              key={todo.id}
              after={
                <>
                  <Button size="s" onClick={() => handleEdit(todo.id, todo.text)}>
                    Изм
                  </Button>
                  <Button size="s" onClick={() => handleDelete(todo.id)} style={{ marginLeft: 4 }}>
                    Удал
                  </Button>
                </>
              }>
              {todo.text}
            </Cell>
          ))}
        </List>
      </Section>
    </Page>
  );
};
