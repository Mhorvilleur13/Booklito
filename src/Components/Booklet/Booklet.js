import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

const Booklet = ({pdfFiles}) => {
return (
    <div>
    <h5>View PDF</h5>
    <div className="row">
      {pdfFiles.length >= 1 && (
        pdfFiles.map(pdfFile => {
          return (
            <div >
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"> 
            <Viewer fileUrl={pdfFile} />
           </Worker>
        </div>)
        })
      )}
      {pdfFiles.length < 1 && <div>no file selected</div>}
    </div>
    </div>
)

}

export default Booklet;