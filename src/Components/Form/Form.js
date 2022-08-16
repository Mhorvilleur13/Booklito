import React from "react";
import { useRecoilState } from "recoil";

import { pdfFilesState as pdfFilesAtom } from "../../atom";

const Form = ({ handleFile, pdfError }) => {
  const [pdfFiles, setPdfFiles] = useRecoilState(pdfFilesAtom);
  return (
    <div className="col-6 text-center mx-auto mt-4">
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
  );
};

export default Form;
