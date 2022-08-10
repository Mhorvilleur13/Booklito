import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import leftArrow from "../../Assets/images/left-arrow.png";
import rightArrow from "../../Assets/images/right-arrow.png";
import "../../index.css";

const Booklet = ({ pdfFiles, currentPage, moveRight, moveLeft }) => {
  return (
    <div className="booklet-section row ">
      <div className="col-8">
        <Carousel interval={null}>
          {pdfFiles.length >= 1 &&
            pdfFiles.map((pdfFile) => {
              return (
                <Carousel.Item>
                  <embed src={pdfFile} className="w-100 page" />
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      {pdfFiles.length < 1 && <div>no file selected</div>}
    </div>
  );
};

export default Booklet;
