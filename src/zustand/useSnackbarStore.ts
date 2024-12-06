import { create } from "zustand";

interface ISnackbarMessage {
  id: number;
  text: string;
  type: "success" | "error";
}

interface ISnackbarState {
  messages: ISnackbarMessage[];
  addSnackbar: (text: string, type: "success" | "error") => void;
}

export const useSnackbarStore = create<ISnackbarState>((set) => ({
  messages: [],
  addSnackbar: (text, type = "success") => {
    const id = Date.now();
    set((state) => ({
      messages: [...state.messages, { id, text, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== id),
      }));
    }, 3000);
  },
}));
