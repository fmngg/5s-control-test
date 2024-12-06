import { FC, useState } from "react";

import { ITodo } from "../../interfaces";

import { statuses } from "../../constants";

import UIButton from "../../ui/ui-button";
import UISelect from "../../ui/ui-select";
import UIModal from "../../ui/ui-modal";

import { useTodoStore } from "../../zustand/useTodoStore";

import CreateTodoModal from "./components/createTodo";
import DeleteTodoModal from "./components/deleteTodo";
import EditTodoModal from "./components/editTodo";
import Todo from "./components/todo";

import styles from "./Todos.module.scss";

const Todos: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  const [filterStatus, setFilterStatus] = useState<string>("Все");

  const { todos } = useTodoStore();

  const filteredTodos =
    filterStatus === "Все"
      ? todos
      : todos.filter((todo) => todo.status === filterStatus);

  const setOpenEditModal = (todo: ITodo) => {
    if (todo) {
      setSelectedTodo(todo);
      setIsEditModalOpen(true);
    }
  };

  const setOpenDeleteModal = (todo: ITodo) => {
    if (todo) {
      setSelectedTodo(todo);
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.table}>
        <div className={styles.tableTitle}>
          <div className={styles.titles}>
            <p>ID</p>
            <p>Название</p>
            <p>Статус</p>
            <p>Дата</p>
          </div>
          <div className={styles.actions}>
            <UISelect
              selectProps={{
                value: filterStatus,
                onChange: (e) => setFilterStatus(e.target.value),
              }}
              options={statuses}
            />
            <UIButton
              variant="default"
              buttonProps={{ onClick: () => setIsCreateModalOpen(true) }}
            >
              ДОБАВИТЬ
            </UIButton>
          </div>
        </div>
        <div className={styles.tableItems}>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <Todo
                {...todo}
                key={todo.id}
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ))
          ) : (
            <h1>Задач нет</h1>
          )}
        </div>
      </div>
      <UIModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateTodoModal />
      </UIModal>
      <UIModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedTodo && (
          <EditTodoModal
            onClose={() => setIsEditModalOpen(false)}
            {...selectedTodo}
          />
        )}
      </UIModal>
      <UIModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        {selectedTodo && (
          <DeleteTodoModal
            id={selectedTodo?.id}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </UIModal>
    </>
  );
};

export default Todos;
