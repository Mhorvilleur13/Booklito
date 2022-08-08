import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {useState} from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import leftArrow from "../../Assets/images/left-arrow.png";
import rightArrow from "../../Assets/images/right-arrow.png"
import "../../index.css";

const Booklet = ({pdfFiles, currentPage, moveRight, moveLeft}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }
return (
    //    <div className="booklet-section">
    //   {pdfFiles.length >= 1 && (
    //  <div className="booklet row justify-content-md-center mt-4">
    //        <div className="col-1 my-auto">
    //            <img src={leftArrow} onClick={() => moveLeft()} className="prev-btn"></img> 
    //        </div>
    //     <div className="col-10 w-50 h-100">
    //        <Worker className={currentPage} workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"> 
    //          <Viewer fileUrl={pdfFiles[currentPage]} />
    //        </Worker>
    //     </div>
    //    <div className="col-1 my-auto">
    //        <img src={rightArrow} onClick={() => moveRight()}  className="next-btn"></img> 
    //        {/* Listener for the state change to call animation */}
    //    </div>
    //  </div>)
    //     }
    //   {pdfFiles.length < 1 && <div>no file selected</div>}
    //  </div>)
    <div className="booklet-section row ">
      <div className="col-8">
       <Carousel interval={null}>
      {pdfFiles.length >= 1 && (
        pdfFiles.map((pdfFile) => {
  return( 
    <Carousel.Item>
    <embed src={pdfFile} className="w-100 page"/>
    </Carousel.Item>
  )}
  )
)  }
       </Carousel>
       </div>
   {pdfFiles.length < 1 && <div>no file selected</div>}
 </div>)
    
}

export default Booklet;