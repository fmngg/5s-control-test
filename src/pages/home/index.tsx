import { FC, useEffect, useRef } from "react";

import UIButton from "../../ui/ui-button";

import Contacts from "../../widgets/contacts";

import styles from "./Home.module.scss";
import Todos from "../../widgets/todos";
import { useHeaderStore } from "../../zustand/useHeaderStore";

const HomePage: FC = () => {
  const { setMainSection, setTodosSection } = useHeaderStore();

  const mainRef = useRef<HTMLDivElement | null>(null);
  const todosRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mainRef.current) setMainSection(mainRef.current);
    if (todosRef.current) setTodosSection(todosRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.homePage}>
      <div ref={mainRef} className={styles.main}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Контролируйте производственные процессы с помощью видеоаналитики на
            базе ИИ
          </h1>
          <div>
            <p>5S Control</p>
            <ul className={styles.list}>
              <li>
                Помогает максимально эффективно использовать оборудование,
                одновременно улучшая возможности вашей существующей системы
                видеонаблюдения.
              </li>
              <li>
                Легко и безопасно интегрируется, предоставляя расширенный
                контроль без необходимости дорогостоящей замены оборудования.
              </li>
              <li>
                Современный подход к мониторингу для оптимизации использования
                ресурсов.
              </li>
            </ul>
          </div>
          <UIButton
            buttonProps={{
              onClick: () => window.open("https://5scontrol.com/", "_blank"),
            }}
            variant="default"
          >
            ОЗНАКОМИТЬСЯ
          </UIButton>
        </div>
        <div className={styles.image}>
          <img
            src="https://5scontrol.com/templates/yootheme/cache/b1/pic%20for%20hero%20section%201-b132285b.webp"
            alt=""
          />
        </div>
      </div>
      <div ref={todosRef} className={styles.todos}>
        <h1 className={styles.todosTitle}>Задачи 5S</h1>
        <Todos />
      </div>
      <Contacts />
    </div>
  );
};

export default HomePage;
