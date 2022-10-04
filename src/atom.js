import { atom } from "recoil";

export const bookletsState = atom({
  key: "booklets",
  default: [],
});
export const allPdfFilesState = atom({
  key: "all-pdf-files",
  default: [],
});

export const pdfFilesState = atom({
  key: "pdf-files",
  default: [],
});

export const titleState = atom({
  key: "title-state",
  default: " ",
});
export const teacherState = atom({
  key: "teacher-state",
  default: " ",
});

export const newTitleState = atom({
  key: "new-title-state",
  default: " ",
});

export const newTeacherState = atom({
  key: "new-teacher-state",
  default: " ",
});

export const currentPageState = atom({
  key: "current-page",
  default: [],
});

export const registerEmailState = atom({
  key: "register-email",
  default: " ",
});

export const registerPasswordState = atom({
  key: "register-password",
  default: "",
});

export const loginEmailState = atom({
  key: "login-email",
  default: " ",
});

export const loginPasswordState = atom({
  key: "login-password",
  default: " ",
});

export const userState = atom({
  key: "user-state",
  default: {},
});
