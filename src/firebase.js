import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBUV_DrLJgfjTOCbqfLoV0ASfCX3-G5J3Y",
  authDomain: "netflix-clone-be102.firebaseapp.com",
  projectId: "netflix-clone-be102",
  storageBucket: "netflix-clone-be102.appspot.com",
  messagingSenderId: "992830129635",
  appId: "1:992830129635:web:d22d1a8e45345ff64f8cd6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};