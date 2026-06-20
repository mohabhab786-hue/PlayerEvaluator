import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const subscribeToPlayers = (callback) => {
  const ref = collection(db, "players");

  return onSnapshot(ref, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(data);
  });
};