import Firebase, { db } from "../../config/Firebase";
import "firebase/auth";
import * as ErrorMessages from "../constants/ErrorMessages";

export const handleSignUp = (
  name,
  email,
  password,
  confirmPass,
  setError,
  setLoading
) => {
  setLoading(true);
  if (name.match(/^\s*$/) !== null) {
    setError(ErrorMessages.EMPTY_NAME);
    setLoading(false);
    return;
  } else if (password !== confirmPass) {
    setError(ErrorMessages.PASSWORD_NOT_MATCHING);
    setLoading(false);
    return;
  }

  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const user = {
        uid: response.user.uid,
        name: name,
        email: email,
      };

      // persist to firestore
      db.collection("users").doc(response.user.uid).set(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage;
      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage = ErrorMessages.EMAIL_IN_USE;
          break;
        case "auth/invalid-email":
          errorMessage = ErrorMessages.INVALID_EMAIL;
          break;
        case "auth/weak-password":
          errorMessage = ErrorMessages.WEAK_PASSWORD;
          break;
        case "auth/operation-not-allowed":
          errorMessage = ErrorMessages.NOT_ALLOWED;
          break;
      }
      setError(errorMessage);
      setLoading(false);
    });
};

export const handleLogin = (email, password, setError, setLoading) => {
  setLoading(true);
  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(() => {
      setError(ErrorMessages.LOGIN_ERROR);
      setLoading(false);
    });
};

export const checkIfLoggedIn = (navigation) => {
  Firebase.auth().onAuthStateChanged(async (rawUser) => {
    if (rawUser) {
      // store user in global store
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Landing");
    }
  });
};

export const logout = () => {
  Firebase.auth()
    .signOut()
    .catch((e) => console.log(e));
};

/**
 *
 * @param {String} userUid
 * @returns {Promise<{
 *  uid: String,
 *  name: String,
 *  email: String
 * }>}
 */
export const getUserData = async (userUid) => {
  const user = await db.collection("users").doc(userUid).get();
  return user.data();
};
