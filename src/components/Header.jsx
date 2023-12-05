import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
      <div className="flex justify-between items-center w-full">
        <img
          className="w-44"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        />
        {user && (
          <div className="flex items-center p-2">
            <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
            <button onClick={handleSignOut} className="font-bold text-white">
              (Sign Out)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
