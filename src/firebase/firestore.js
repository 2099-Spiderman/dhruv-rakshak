import app from "../firebase/firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default db;