import { useState, useEffect, useContext } from "react";
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
  userEmailState as userEmailAtom,
  confirmationPasswordState as confirmationPasswordAtom,
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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Auth";
import { where, query } from "firebase/firestore";

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
  const [isAuth, setIsAuth] = useState(true);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  const [confirmPassword, setConfirmPassword] = useRecoilState(
    confirmationPasswordAtom
  );
  const [passwordError, setPasswordError] = useState("");

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
        const bookletsArr = [];
        querySnapshot.forEach((doc) => {
          bookletsArr.push(doc.data());
        });
        console.log(bookletsArr);
        setBooklets(bookletsArr);
      });
      return unsubscribe;
    }
  }, [userEmail]);

  const createBookletDb = async () => {
    await addDoc(bookletsCollectionRef, {
      title: title,
      teacher: teacher,
      files: currentPdfFiles,
      user: userEmail,
    });
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
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
      <div className="row">
        <AuthProvider>
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
              exact
              path="/booklets"
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Booklet
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
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
