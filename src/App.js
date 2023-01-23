import { useState, useEffect, useContext } from "react";
import { Navigate, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
//Import Atoms
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
  userEmailState as userEmailAtom,
  confirmationPasswordState as confirmationPasswordAtom,
} from "./atom";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
//import components
import Booklets from "./Components/Booklets/Booklets.js";
import Booklet from "./Components/Booklet/Booklet";
import Form from "./Components/Form/Form";
import Login from "./Components/login/login";
import Register from "./Components/Register/Register";
import About from "./Components/About/About";
import PrivateRoute from "./PrivateRoute";
//import Firebase
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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./Auth";
import { where, query } from "firebase/firestore";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

function App() {
  const bookletsCollectionRef = collection(db, "Booklet");
  const [allPdfFiles, setAllPdfFiles] = useRecoilState(allPdfFilesAtom);
  const [currentPdfFiles, setCurrentPdfFiles] = useRecoilState(pdfFilesAtom);
  const [booklets, setBooklets] = useRecoilState(bookletsAtom);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [teacher, setTeacher] = useRecoilState(teacherAtom);
  const [registerEmail, setRegisterEmail] = useRecoilState(registerEmailAtom);
  const [registerPassword, setRegisterPassword] =
    useRecoilState(registerPasswordAtom);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useRecoilState(loginPasswordAtom);
  const allowedFiles = ["application/pdf"];
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  const [confirmPassword, setConfirmPassword] = useRecoilState(
    confirmationPasswordAtom
  );
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const register = async () => {
    if (confirmPassword !== registerPassword) {
      return setPasswordError("Passwords don't match");
    }
    try {
      setPasswordError("");
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
    navigate("/Home");
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
    navigate("/booklets");
  };

  const logout = async () => {
    console.log("log out");
    await signOut(auth);
  };

  // useEffect(() => {
  //   const unsub = onSnapshot(bookletsCollectionRef, (snapshot) => {
  //     setBooklets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   });
  //   return unsub;
  //   //return filtered snapshot like with california example.
  //   //pass query to onSnapShot
  // }, []);

  useEffect(() => {
    if (userEmail) {
      const q = query(
        collection(db, "Booklet"),
        where("user", "==", userEmail)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setBooklets(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      console.log(booklets);
      return unsubscribe;
    }
  }, [userEmail]);

  function createUUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  const createBookletDb = async () => {
    try {
      await addDoc(bookletsCollectionRef, {
        title: title,
        teacher: teacher,
        files: currentPdfFiles,
        user: userEmail,
        bookletId: createUUID(),
      });
    } catch (error) {
      console.log(error);
    }
    //set autoher_uid to the same as user uid;
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

  const deletePdfFromPreview = (fileName) => {
    const pdf = currentPdfFiles.find((pdf) => pdf.fileName === fileName);
    if (!pdf) {
      return;
    }
    const newPdfs = currentPdfFiles.filter((pdf) => pdf.fileName !== fileName);
    setCurrentPdfFiles(newPdfs);
  };

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          const newPdfFiles = [...currentPdfFiles];
          newPdfFiles.push({
            fileName: selectedFile.name,
            base64: e.target.result,
          });
          setCurrentPdfFiles(newPdfFiles);
        };
      } else {
        //setPdfError("Not a valid pdf");
      }
    } else {
      console.log("please select file");
    }
  };
  // useEffect(() => {
  //   const getBookletsDb = async () => {
  //     const data = await getDocs(bookletsCollectionRef);
  //     console.log(data);
  //     setBooklets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getBookletsDb();
  // }, []);
  return (
    <div className="mt-2 page-container container-fluid p-0">
      <Navbar
        className="navbar"
        expanded={expanded}
        sticky="top"
        expand="lg"
        variant="dark"
      >
        {" "}
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>
              {" "}
              <Link
                to="/booklets"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Booklets
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/form"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Upload New Booklet
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/about"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                About
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className={!expanded ? "expanded" : ""}>
            <Nav.Link>
              {" "}
              <Link
                to="/login"
                className="nav-link"
                onClick={() => {
                  setExpanded(false);
                  currentUser && logout();
                }}
              >
                {currentUser ? "Logout" : "Login"}
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                {!currentUser ? "Register" : ""}
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="row">
        <Routes>
          <Route
            path="booklets"
            element={
              <PrivateRoute>
                <Booklets
                  allPdfFiles={allPdfFiles}
                  booklets={booklets}
                  currentPdfFiles={currentPdfFiles}
                  editBooklet={editBooklet}
                  deleteBooklet={deleteBooklet}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/form"
            element={
              <PrivateRoute>
                <Form
                  deletePdfFromPreview={deletePdfFromPreview}
                  handleFile={handleFile}
                  createBookletDb={createBookletDb}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                passwordError={passwordError}
                register={register}
                logout={logout}
                login={login}
              />
            }
          />
          <Route
            path="/"
            element={
              <Register passwordError={passwordError} register={register} />
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/booklet/:id" element={<Booklet />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
