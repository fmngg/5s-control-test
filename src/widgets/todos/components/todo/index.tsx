import { FC } from "react";

import styles from "./Todo.module.scss";
import UIButton from "../../../../ui/ui-button";
import { ITodo } from "../../../../interfaces";

interface ITodoProps extends ITodo {
  setOpenEditModal: (todo: ITodo) => void;
  setOpenDeleteModal: (todo: ITodo) => void;
}

const Todo: FC<ITodoProps> = ({
  id,
  name,
  status,
  date,
  setOpenEditModal,
  setOpenDeleteModal,
}) => (
  <div className={styles.tableItem}>
    <p>{id}</p>
    <p>{name}</p>
    <p>{status}</p>
    <p>{date}</p>

    <UIButton
      buttonProps={{
        onClick: () => setOpenEditModal({ id, name, status, date }),
      }}
      variant="outlined"
    >
      Редактировать
    </UIButton>

    <UIButton
      buttonProps={{
        onClick: () => setOpenDeleteModal({ id, name, status, date }),
      }}
      variant="danger"
    >
      Удалить
    </UIButton>
  </div>
);

export default Todo;
