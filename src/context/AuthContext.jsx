import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast, Bounce } from "react-toastify";

export const Auth_Context = createContext();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const emailSignUp = async ({ name, email, password, photo_URL }) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;

      setCreatedUser(createdUser);

      await updateProfile(createdUser, {
        displayName: name,
        photoURL: photo_URL,
      });

      setUser({
        name,
        email,
        image: photo_URL,
      });

      setForgotEmail(email);

      // console.log("Register user ==> ", name, email, photo_URL);

      toast.success("✅ Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return { success: true };
    } catch (error) {
      console.error("❌ Registration Error:", error.message);

      toast.error(`Register Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const emailLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredential.user;

      setUser({
        name: loggedUser.displayName || "",
        image: loggedUser.photoURL || "",
        email: loggedUser.email || "",
      });

      setForgotEmail(loggedUser.email);

      toast.success("✅ Login successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      alert(error.message);

      toast.error(`Login Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const update = async ({ name, email, image }) => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) throw new Error("No authenticated user found.");

      if (currentUser.email !== email) {
        await updateEmail(currentUser, email);
      }

      if (currentUser.displayName !== name || currentUser.photoURL !== image) {
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: image,
        });
      }

      setUser({
        name,
        email,
        image,
      });

      toast.success("✅ Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: true };
    } catch (error) {
      toast.error(`Update Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      console.error("Update Error =>", error.message);

      return { success: false, error };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "",
          image: currentUser.photoURL || "",
          email: currentUser.email || "",
        });

        setForgotEmail(currentUser.email);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser({
        name: user.displayName || "",
        image: user.photoURL || "",
        email: user.email || "",
      });

      setForgotEmail(user.email);

      toast.success("✅ Google login successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return { success: true, user };
    } catch (error) {
      toast.error(`❌ Google Sign-in Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      alert("Sign-in failed: " + error.message);
      return { success: false, error };
    } finally {
      setGoogleLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setTimeout(() => setUser(null), 0);

      toast.success("👋 Logged out successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: true };
    } catch (error) {
      console.error("Logout Error:", error.message);

      toast.error(`Logout failed: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      return { success: false };
    }
  };

  const resetPassword = async (email) => {
    try {
      if (!email) {
        toast.error("Please enter your registered email address.", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        return { success: false };
      }

      await sendPasswordResetEmail(auth, email);

      toast.success(
        "📩 Password reset email sent! Check your inbox. and you spam box",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );

      return { success: true };
    } catch (error) {
      toast.error(`❌ Reset Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      console.error("Reset Password Error =>", error.message);
      return { success: false, error };
    }
  };

  return (
    <Auth_Context.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        googleLoading,
        loading,
        emailLogin,
        emailSignUp,
        createdUser,
        update,
        forgotEmail,
        setForgotEmail,
        resetPassword,
      }}
    >
      {children}
    </Auth_Context.Provider>
  );
}

export default AuthContext;
