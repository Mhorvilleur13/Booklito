import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  allPdfFilesState as allPdfFilesAtom,
  bookletsState as bookletsAtom,
  pdfFilesState as pdfFilesAtom,
  titleState as titleAtom,
  teacherState as teacherAtom,
} from "../../atom";
import { useForm } from "react-hook-form";

const Form = ({ handleFile, createBookletDb }) => {
  const [allPdfFiles, setAllPdfFiles] = useRecoilState(allPdfFilesAtom);
  const [currentPdfFiles, setCurrentPdfFiles] = useRecoilState(pdfFilesAtom);
  const [booklets, setBooklets] = useRecoilState(bookletsAtom);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [teacher, setTeacher] = useRecoilState(teacherAtom);
  const { handleSubmit } = useForm();
  const [pdfError, setPdfError] = useState("");

  const onSubmit = (data, e) => {
    const newBooklet = {
      title: title,
      teacher: teacher,
      files: currentPdfFiles,
    };
    const newBooklets = [...booklets];
    newBooklets.push(newBooklet);
    if (currentPdfFiles.length == 0) {
      return setPdfError("PDF failed to load");
    }
    setBooklets(newBooklets);
    createBookletDb();

    setCurrentPdfFiles([]);
    console.log("form submitted");
    e.target.reset();
  };

  return (
    <div className="row">
      <div className="col-6 text-center mx-auto mt-5 border">
        <form onSubmit={handleSubmit(onSubmit)} className="form-group">
          <label className="mt-3">
            <h5>Upload PDF</h5>
          </label>
          <br></br>
          <div className="text-secondary">
            <h5>Title</h5>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="text-secondary mt-3">
            <h5>Teacher Name</h5>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTeacher(e.target.value)}
            ></input>
          </div>
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
            ></input>
          </div>
          <div className="mt-3">
            <h6>Number of Files Chosen: {currentPdfFiles.length}</h6>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Create Booklet
            </button>
          </div>
          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>
      </div>
    </div>
  );
};

export default Form;
