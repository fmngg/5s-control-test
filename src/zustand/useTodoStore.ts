import { create } from "zustand";
import { ITodo, TodoSchema } from "../interfaces";

interface ITodoState {
  todos: ITodo[];
  addTodo: ({ name, status, date }: Omit<ITodo, "id">) => void;
  editTodo: ({ id, name, status, date }: ITodo) => void;
  deleteTodo: (id: ITodo["id"]) => void;
}

const LOCAL_STORAGE_KEY = "todos";

const loadTodos = (): ITodo[] => {
  try {
    const rawData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const parsedTodos = TodoSchema.array().safeParse(rawData);

    if (parsedTodos.success) {
      return parsedTodos.data;
    } else {
      console.error("Неверный формат данных");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return [];
  }
};

const saveTodos = (todos: ITodo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

export const useTodoStore = create<ITodoState>((set) => {
  const updateTodos = (updater: (todos: ITodo[]) => ITodo[]) => {
    set((state) => {
      const updatedTodos = updater(state.todos);
      saveTodos(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  return {
    todos: loadTodos(),

    addTodo({ name, status, date }) {
      updateTodos((todos) => [
        ...todos,
        {
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          name,
          status,
          date,
        },
      ]);
    },

    editTodo({ id, name, status, date }) {
      updateTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, name, status, date } : todo
        )
      );
    },

    deleteTodo(id) {
      updateTodos((todos) => todos.filter((todo) => todo.id !== id));
    },
  };
});
