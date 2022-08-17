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

export const currentPageState = atom({
  key: "current-page",
  default: [],
});
