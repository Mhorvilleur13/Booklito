import { useState } from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import {
  allPdfFilesState as allPdfFilesAtom,
  bookletsState as bookletsAtom,
  pdfFilesState as pdfFilesAtom,
} from "./atom";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import Booklet from "./Components/Booklet/Booklet.js";
import Form from "./Components/Form/Form";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [allPdfFiles, setAllPdfFiles] = useRecoilState(allPdfFilesAtom);
  const [currentPdfFiles, setCurrentPdfFiles] = useRecoilState(pdfFilesAtom);
  const [pdfError, setPdfError] = useState("");
  const [booklets, setBooklets] = useRecoilState(bookletsAtom);
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          //Set ALL pdf files
          const newAllPdfFiles = [...allPdfFiles];
          newAllPdfFiles.push(e.target.result);
          setAllPdfFiles(newAllPdfFiles);
          //Set pdf Files for single booklet
          const newPdfFiles = [...currentPdfFiles];
          newPdfFiles.push(e.target.result);
          setCurrentPdfFiles(newPdfFiles);
        };
      } else {
        setPdfError("Not a valid pdf");
      }
    } else {
      console.log("please select file");
    }
  };
  return (
    <div className="mt-4 container page-container">
      <div className="row">
        <div className="col text-center">
          <Link to="/form" className="btn btn-primary">
            Form
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/booklets" className="btn btn-primary">
            Booklets
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/about" className="btn btn-primary">
            About
          </Link>
        </div>
      </div>
      <div className="row">
        <Routes>
          <Route
            path="/form"
            element={<Form handleFile={handleFile} pdfError={pdfError} />}
          />
          <Route
            path="/booklets"
            element={
              <Booklet
                allPdfFiles={allPdfFiles}
                booklets={booklets}
                currentPdfFiles={currentPdfFiles}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
