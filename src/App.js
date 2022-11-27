import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
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
import Booklet from "./Components/Booklet/Booklet.js";
import Form from "./Components/Form/Form";
import Login from "./Components/login/login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Auth";
import { where, query } from "firebase/firestore";

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
    navigate("/Home");
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
        console.log(booklets);
      });
      return unsubscribe;
    }
  }, [userEmail]);

  const createBookletDb = async () => {
    try {
      await addDoc(bookletsCollectionRef, {
        title: title,
        teacher: teacher,
        files: currentPdfFiles,
        user: userEmail,
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
    console.log("delete");
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
          const newPdfFiles = [...currentPdfFiles];
          newPdfFiles.push(e.target.result);
          setCurrentPdfFiles(newPdfFiles);
          console.log(currentPdfFiles);
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
    <div className="mt-4 container page-container">
      <Navbar bg="light" expanded={expanded} sticky="top" expand="lg">
        {" "}
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>
              {" "}
              <Link
                to="/Home"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/"
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
                to="/about"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/register"
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
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route
              path="form"
              element={
                <Form
                  handleFile={handleFile}
                  createBookletDb={createBookletDb}
                />
              }
            />
            <Route index element={<Navigate to="booklets" replace />} />
            <Route
              exact
              path="booklets"
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
          </Route>
          <Route
            path="/"
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
            path="/register"
            element={
              <Register passwordError={passwordError} register={register} />
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
