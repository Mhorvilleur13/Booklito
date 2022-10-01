import { useState, useEffect } from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import {
  allPdfFilesState as allPdfFilesAtom,
  bookletsState as bookletsAtom,
  pdfFilesState as pdfFilesAtom,
  titleState as titleAtom,
  teacherState as teacherAtom,
  newTeacherState as newTeacherAtom,
  newTitleState as newTitleAtom,
  registerEmailState as registerEmailAtom,
  registerPasswordState as registerPasswordAtom,
  loginEmailState as loginEmailAtom,
  loginPasswordState as loginPasswordAtom,
} from "./atom";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import Booklet from "./Components/Booklet/Booklet.js";
import Form from "./Components/Form/Form";
import Login from "./Components/login/login";
import { Routes, Route, Link } from "react-router-dom";
import { db, auth } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const bookletsCollectionRef = collection(db, "Booklet");
  const [allPdfFiles, setAllPdfFiles] = useRecoilState(allPdfFilesAtom);
  const [currentPdfFiles, setCurrentPdfFiles] = useRecoilState(pdfFilesAtom);
  const [pdfError, setPdfError] = useState("");
  const [booklets, setBooklets] = useRecoilState(bookletsAtom);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [teacher, setTeacher] = useRecoilState(teacherAtom);
  const [registerEmail, setRegisterEmail] = useRecoilState(registerEmailAtom);
  const [registerPassword, setRegisterPassword] =
    useRecoilState(registerPasswordAtom);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useRecoilState(loginPasswordAtom);
  const allowedFiles = ["application/pdf"];

  // useEffect(() => {
  //   const getBookletsDb = async () => {
  //     const data = await getDocs(bookletsCollectionRef);
  //     console.log(data);
  //     setBooklets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getBookletsDb();
  // }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {};

  const logout = async () => {};

  useEffect(() => {
    const unsub = onSnapshot(bookletsCollectionRef, (snapshot) => {
      setBooklets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const createBookletDb = async () => {
    await addDoc(bookletsCollectionRef, {
      title: title,
      teacher: teacher,
      files: currentPdfFiles,
    });
  };

  const editBooklet = async (id, newTitle, newTeacher) => {
    const bookletDoc = doc(db, "Booklet", id);
    const newFields = { title: newTitle, teacher: newTeacher };
    await updateDoc(bookletDoc, newFields);
    console.log("it worked");
  };

  const deleteBooklet = async (id) => {
    const bookletDoc = doc(db, "Booklet", id);
    await deleteDoc(bookletDoc);
  };

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          //Set ALL pdf files
          const newAllPdfFiles = [...allPdfFiles];
          newAllPdfFiles.push(e.target.result);
          setAllPdfFiles(newAllPdfFiles);
          //Set pdf Files for single booklet
          const newPdfFiles = [...currentPdfFiles];
          newPdfFiles.push(e.target.result);
          setCurrentPdfFiles(newPdfFiles);
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
        <div className="col text-center">
          <Link to="/form" className="btn btn-primary">
            Form
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/booklets" className="btn btn-primary">
            Booklets
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/about" className="btn btn-primary">
            About
          </Link>
        </div>
        <div className="col text-center">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
      <div className="row">
        <Routes>
          <Route
            path="/form"
            element={
              <Form
                handleFile={handleFile}
                pdfError={pdfError}
                createBookletDb={createBookletDb}
              />
            }
          />
          <Route
            path="/booklets"
            element={
              <Booklet
                allPdfFiles={allPdfFiles}
                booklets={booklets}
                currentPdfFiles={currentPdfFiles}
                editBooklet={editBooklet}
                deleteBooklet={deleteBooklet}
              />
            }
          />
          <Route path="/login" element={<Login register={register} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
