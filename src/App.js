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
import leftArrow from "./Assets/images/left-arrow.png";

function App() {
  const [pdfFiles, setPdfFiles] = useRecoilState(pdfFilesAtom);
  const [pdfError, setPdfError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
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
        <div className="col-12 mx-auto">
          <form>
            <label>
              <h5>Upload PDF</h5>
            </label>
            <br></br>
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
            ></input>
            {pdfError && <span className="text-danger">{pdfError}</span>}
          </form>
        </div>
      </div>
      <Booklet pdfFiles={pdfFiles} />
    </div>
  );
}

export default App;
