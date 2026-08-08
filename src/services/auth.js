import app from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export { auth };