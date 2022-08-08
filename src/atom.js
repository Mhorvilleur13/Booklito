import {atom} from 'recoil';

export const pdfFilesState = atom({
    key: "pdf-files", 
    default: []
})

export const currentPageState = atom({
    key: "current-page", 
    default: []
})