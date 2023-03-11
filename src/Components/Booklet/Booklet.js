import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ELFlogo from "../../Assets/images/ELP_Logo_TaglineStacked_Blue.png";
import { useParams } from "react-router-dom";
import "../../index.css";
import { collection, onSnapshot } from "firebase/firestore";
import { where, query } from "firebase/firestore";
import { db } from "../../firebase-config";

const Booklet = () => {
  const [singleBooklet, setSingleBooklet] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const q = query(
        collection(db, "Booklet"),
        where("bookletId", "==", params.id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setSingleBooklet(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      console.log(singleBooklet);
      return unsubscribe;
    }
  }, []);
  return (
    <div className="booklet-section row">
      <div className="col-md-8 col-sm-10 col-lg-7 col-xl-5 mx-auto">
        {singleBooklet.length === 0 ? (
          <p>Loading....</p>
        ) : (
          <Carousel interval={null}>
            <Carousel.Item>
              <div className="cover">
                <img src={ELFlogo} className="cover-logo"></img>
                {singleBooklet[0].title.length > 23 ? (
                  <h2 className="text-secondary text-center">
                    {singleBooklet[0].title}
                  </h2>
                ) : (
                  <h1 className="text-secondary text-center">
                    {singleBooklet[0].title}
                  </h1>
                )}
                <br></br>
                <h5>By</h5>
                <h3 className="text-secondary">{singleBooklet[0].teacher}</h3>
              </div>
            </Carousel.Item>
            {singleBooklet[0].files.map((pdfFile, index) => {
              return (
                <Carousel.Item>
                  <h4 className="text-center">
                    Student {index + 1} / {singleBooklet[0].files.length}
                  </h4>
                  <iframe
                    src={pdfFile.base64 + "#zoom=65"}
                    width="100%"
                    height="500px"
                    frameborder="0"
                    scrolling="no"
                    className="page"
                  >
                    <p>Your web browser doesn't support iframes.</p>
                  </iframe>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Booklet;
