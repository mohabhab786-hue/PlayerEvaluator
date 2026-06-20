import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs
} from "firebase/firestore";

// Firestore collection reference
const playersRef = collection(db, "players");


// ==============================
// 📥 GET ALL PLAYERS
// ==============================
export const getPlayers = async () => {
  const snapshot = await getDocs(playersRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};


// ==============================
// ➕ ADD PLAYER
// ==============================
export const addPlayer = async (player) => {
  await addDoc(playersRef, player);
};


// ==============================
// ❌ DELETE PLAYER
// ==============================
export const deletePlayer = async (id) => {
  const playerDoc = doc(db, "players", id);
  await deleteDoc(playerDoc);
};


// ==============================
// ✏️ UPDATE PLAYER
// ==============================
export const updatePlayer = async (updated) => {
  const playerDoc = doc(db, "players", updated.id);

  await updateDoc(playerDoc, {
    name: updated.name,
    role: updated.role,
    rating: updated.rating
  });
};