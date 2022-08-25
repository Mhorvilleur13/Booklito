import React from "react";
import Carousel from "react-bootstrap/Carousel";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import ELFlogo from "../../Assets/images/ELP_Logo_TaglineStacked_Blue.png";
import "../../index.css";

const Booklet = ({ booklets }) => {
  return (
    <div className="booklet-section row">
      <div className="col-md-8 col-sm-9 col-lg-6 col-xl-5 mx-auto">
        {booklets.length >= 1
          ? booklets.map((booklet) => {
              return (
                <Carousel interval={null}>
                  <Carousel.Item>
                    <h4 className="text-center">Cover</h4>
                    <div className="cover">
                      <img src={ELFlogo} className="cover-logo"></img>
                      <h1>{booklet.title}</h1>
                      <br></br>
                      <h3>By</h3>
                      <h3>{booklet.teacher}</h3>
                    </div>
                  </Carousel.Item>
                  {booklet.files.map((pdfFile, index) => {
                    return (
                      <Carousel.Item>
                        <h4 className="text-center">
                          Page {index + 1} / {booklet.files.length}
                        </h4>
                        <embed src={pdfFile} className="w-100 page" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              );
            })
          : booklets.length < 1 && (
              <h3 className="text-center">No File Selected</h3>
            )}
      </div>
    </div>
  );
};

export default Booklet;
