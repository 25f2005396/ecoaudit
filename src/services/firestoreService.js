import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const COLLECTION_NAME = "waste_logs";

// Add a new waste log
export async function addWasteLog(data) {
  const weight = Number(data.weight);

  if (isNaN(weight) || weight <= 0) {
  return {
    success: false,
    error: "Invalid waste weight.",
  };
}

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      category: data.category,
      weight,
      location: data.location,
      notes: data.notes || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get all waste logs ordered by newest first
export async function getWasteLogs() {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const wasteLogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, wasteLogs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}