import { useState } from "react";
import { useRecoilState, atom } from "recoil";
import {
  pdfFilesState as pdfFilesAtom,
  currentPageState as currentPageAtom,
} from "./atom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import Booklet from "./Components/Booklet/Booklet.js";
import Form from "./Components/Form/Form";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [pdfFiles, setPdfFiles] = useRecoilState(pdfFilesAtom);
  const [pdfError, setPdfError] = useState("");
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          const newPdfFiles = [...pdfFiles];
          newPdfFiles.push(e.target.result);
          console.log(newPdfFiles);
          setPdfFiles(newPdfFiles);
          console.log(`pdfFiles: ${pdfFiles}`);
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
          <Link to="/booklets" className="btn btn-primary">
            Booklets
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/form" className="btn btn-primary">
            Form
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
          <Route path="/booklets" element={<Booklet pdfFiles={pdfFiles} />} />
          <Route
            path="/form"
            element={<Form handleFile={handleFile} pdfError={pdfError} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
