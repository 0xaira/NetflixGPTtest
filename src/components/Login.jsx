import { useState, useRef } from "react";
import Header from "./Header";
import poster from '../assets/poster-bg.jpeg';
import { checkValidData } from '../utils/validate';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBqel6kujCmela7ZD3nJc9eW_XnCXudBtM",
  authDomain: "netflixgpt-7684d.firebaseapp.com",
  projectId: "netflixgpt-7684d",
  storageBucket: "netflixgpt-7684d.appspot.com",
  messagingSenderId: "1052821090463",
  appId: "1:1052821090463:web:9ca0321c35947e877a72aa",
  measurementId: "G-7S3XHKH273"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, seterrorMessage] = useState(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;

    const auth = getAuth();


    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://e1.pxfuel.com/desktop-wallpaper/447/176/desktop-wallpaper-gojo-satoru-gojo-pfp.jpg",
          })
          .then(() => {
            navigate("/browse");
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          })
            .catch((error) => {
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          seterrorMessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {

          const user = userCredential.user;
          console.log(user);
          navigate("/browse");

        })
        .catch((error) => {
          seterrorMessage(error.message);
        });
    }
  }


  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={poster} alt='poster' className='w-full' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {errorMessage && <p className='text-red-500 font-bold text-lg '>{errorMessage}</p>}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-300">
              Remember Me
            </label>
          </div>
          <p className="text-gray-300 cursor-pointer">Need Help?</p>
        </div>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
