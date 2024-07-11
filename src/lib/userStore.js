import { create } from "zustand";
import { database } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    set({ isLoading: true });
    if (!uid) {
      console.log("No UID provided, setting currentUser to null");
      set({ currentUser: null, isLoading: false });
     return;
    } 
    try {

      console.log("Fetching user info for UID:", uid);

      const docRef = doc(database, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data fetched:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No user document found for UID:", uid);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
     set({ currentUser: null, isLoading: false });
    }
  },
}));

export default useUserStore;
