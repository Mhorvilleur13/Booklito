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

const Booklet = ({ booklets, editBooklet }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleSubmit } = useForm();
  const [newTitle, setNewTitle] = useRecoilState(newTitleAtom);
  const [newTeacher, setNewTeacher] = useRecoilState(newTeacherAtom);
  const onSubmit = (e) => {
    e.target.reset();
  };
  return (
    <div className="booklet-section row">
      <div className="col-md-8 col-sm-9 col-lg-6 col-xl-5 mx-auto">
        {booklets.length >= 1
          ? booklets.map((booklet) => {
              return (
                <Carousel interval={null} className="mt-4">
                  <Carousel.Item>
                    <h4 className="text-center">Cover</h4>
                    <div className="cover">
                      <img src={ELFlogo} className="cover-logo"></img>
                      <h1>{booklet.title}</h1>
                      <br></br>
                      <h3>By</h3>
                      <h4>{booklet.teacher}</h4>
                    </div>
                  </Carousel.Item>
                  {booklet.files.map((pdfFile, index) => {
                    return (
                      <Carousel.Item>
                        <h4 className="text-center">
                          Page {index + 1} / {booklet.files.length}
                        </h4>
                        <embed src={pdfFile} className="w-100 page" />
                        <div className="mt-1">
                          <button onClick={() => setIsEditOpen(true)}>
                            Edit Booklet
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
                                                booklet.title,
                                                booklet.teacher
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
