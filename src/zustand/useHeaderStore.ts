import { create } from "zustand";

interface IHeaderState {
  mainSectionRef: HTMLElement | null;
  todosSectionRef: HTMLElement | null;
  contactsSectionRef: HTMLElement | null;
  setMainSection: (mainRef: HTMLElement | null) => void;
  setTodosSection: (todosRef: HTMLElement | null) => void;
  setContactsSection: (contactsRef: HTMLElement | null) => void;
}

export const useHeaderStore = create<IHeaderState>((set) => ({
  mainSectionRef: null,
  todosSectionRef: null,
  contactsSectionRef: null,

  setMainSection(mainRef) {
    set((state) => ({ ...state, mainSectionRef: mainRef }));
  },
  setTodosSection(todosRef) {
    set((state) => ({
      ...state,
      todosSectionRef: todosRef,
    }));
  },
  setContactsSection(contactsRef) {
    set((state) => ({ ...state, contactsSectionRef: contactsRef }));
  },
}));
