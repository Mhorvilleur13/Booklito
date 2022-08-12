import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import leftArrow from "../../Assets/images/left-arrow.png";
import rightArrow from "../../Assets/images/right-arrow.png";
import ELFlogo from "../../Assets/images/ELP_Logo_TaglineStacked_Blue.png";
import "../../index.css";

const Booklet = ({ pdfFiles }) => {
  return (
    <div className="booklet-section row">
      <div className="col-md-8 col-sm-9 col-lg-6 col-xl-5 mx-auto">
        {pdfFiles.length >= 1 ? (
          <Carousel interval={null}>
            <Carousel.Item>
              <h4 className="text-center">Cover</h4>
              <div className="cover">
                <img src={ELFlogo} className="cover-logo"></img>
                <h2>Title</h2>
                <h3>Author</h3>
              </div>
            </Carousel.Item>
            {pdfFiles.map((pdfFile, index) => {
              return (
                <Carousel.Item>
                  <h4 className="text-center">
                    Page {index + 1} / {pdfFiles.length}
                  </h4>
                  <embed src={pdfFile} className="w-100 page" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          pdfFiles.length < 1 && (
            <h3 className="text-center">No File Selected</h3>
          )
        )}
      </div>
    </div>
  );
};

export default Booklet;
