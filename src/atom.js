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
