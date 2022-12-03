import React, { useState } from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import Carousel from "react-bootstrap/Carousel";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import ELFlogo from "../../Assets/images/ELP_Logo_TaglineStacked_Blue.png";
import "../../index.css";
import { useForm } from "react-hook-form";
import {
  allPdfFilesState as allPdfFilesAtom,
  bookletsState as bookletsAtom,
  pdfFilesState as pdfFilesAtom,
  titleState as titleAtom,
  teacherState as teacherAtom,
  newTeacherState as newTeacherAtom,
  newTitleState as newTitleAtom,
} from "../../atom";
//import { Page, Document } from "react-pdf/dist/esm/entry.webpack";
//import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import MichaelPanel from "../../Assets/images/MichaelPanel.pdf";

const Booklet = ({ booklets, editBooklet, deleteBooklet }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleSubmit } = useForm();
  const [newTitle, setNewTitle] = useRecoilState(newTitleAtom);
  const [newTeacher, setNewTeacher] = useRecoilState(newTeacherAtom);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onSubmit = (e) => {
    e.target.reset();
  };
  return (
    <div className="booklet-section row">
      <div className="col-md-8 col-sm-10 col-lg-7 col-xl-5 mx-auto ">
        {booklets.length >= 1
          ? booklets.map((booklet) => {
              return (
                <Carousel interval={null} className="mt-5">
                  <Carousel.Item>
                    <h4 className="text-center">Cover</h4>
                    <div className="cover">
                      <img src={ELFlogo} className="cover-logo"></img>
                      <h1 className="text-secondary">{booklet.title}</h1>
                      <br></br>
                      <h5>By</h5>
                      <h3 className="text-secondary">{booklet.teacher}</h3>
                    </div>
                  </Carousel.Item>
                  {booklet.files.map((pdfFile, index) => {
                    return (
                      <Carousel.Item>
                        <h4 className="text-center">
                          Student {index + 1} / {booklet.files.length}
                        </h4>
                        {/* <embed
                          src={MichaelPanel + "#zoom=65"}
                          className="w-100 page"
                        /> */}
                        <iframe
                          src={pdfFile + "#zoom=65"}
                          width="100%"
                          height="500px"
                          frameborder="0"
                          scrolling="no"
                          className="page"
                        >
                          <p>Your web browser doesn't support iframes.</p>
                        </iframe>
                        {/* <Document
                          file={pdfFile}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber} />
                        </Document> */}
                        <div className="mr-2 text-center">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setIsEditOpen(true)}
                          >
                            Edit Booklet
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteBooklet(booklet.id)}
                          >
                            Delete Booklet
                          </button>
                        </div>
                        {isEditOpen && (
                          <div
                            className="modal fade show d-block"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Edit Booklet</h5>
                                </div>
                                <div className="modal-body">
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                      <div className="col-10">
                                        <h6>New Title</h6>
                                        <input
                                          type="text"
                                          className="form-control"
                                          onChange={(e) =>
                                            setNewTitle(e.target.value)
                                          }
                                        ></input>
                                      </div>
                                      <div className="col-10 mt-2 mb-4">
                                        <h6>New Teacher</h6>
                                        <input
                                          type="text"
                                          className="form-control"
                                          onChange={(e) => {
                                            setNewTeacher(e.target.value);
                                          }}
                                        ></input>
                                      </div>
                                      <hr></hr>
                                      <div className="row mt-2">
                                        <div className="col text-end">
                                          <button
                                            type="button"
                                            class="btn btn-secondary mr-3"
                                            data-dismiss="modal"
                                            onClick={() => setIsEditOpen(false)}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                        <div className="col-4 text-end">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={() => {
                                              editBooklet(
                                                booklet.id,
                                                newTitle,
                                                newTeacher
                                              );
                                              setIsEditOpen(false);
                                            }}
                                          >
                                            {" "}
                                            Save Changes
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
