import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  setDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { firestore } from "lib/firebaseConfig";
const storage = getStorage();

export async function uploadCV(displayName: any, userId: any, file: any) {
  const storageRef = ref(storage, `${userId}/cv/${displayName} CV`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export const fetchUserCV = async (displayName: any, uid: any) => {
  const cvRef = ref(storage, `${uid}/cv/${displayName} CV`);
  try {
    return await getDownloadURL(cvRef);
  } catch (error: any) {
    // If the file doesn't exist, getDownloadURL() will throw an error
    if (error.code === "storage/object-not-found") {
      return null;
    }
    console.error("Error fetching user CV:", error);
    throw error; // Re-throw unexpected errors
  }
};

export const deleteCV = async (displayName: any, uid: any) => {
  const cvRef = ref(storage, `${uid}/cv/${displayName} CV`);
  try {
    await deleteObject(cvRef);
  } catch (error: any) {
    console.error("Error deleting user CV:", error);
    throw error;
  }
};

export const fetchParsedCVText = async (uid: any) => {
  const docRef = doc(firestore, "users", uid); // Assuming the collection is named 'users' and documents have the same ID as the user's UID
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().parsedCVText; // Assuming the field in Firestore is named 'parsedCVText'
  } else {
    console.log("No such document!");
    return null;
  }
};

export const fetchJobs = async (uid: any) => {
  const jobsRef = collection(firestore, `users/${uid}/jobs`);
  const jobsSnap: QuerySnapshot = await getDocs(jobsRef);
  return jobsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addJob = async (uid: any, job: any) => {
  const jobsRef = collection(firestore, `users/${uid}/jobs`);
  const docRef = await addDoc(jobsRef, job);
  return { id: docRef.id, ...job };
};

export const updateJob = async (uid: any, jobId: any, updatedJob: any) => {
  const jobRef = doc(firestore, `users/${uid}/jobs`, jobId);
  await updateDoc(jobRef, updatedJob);
};

export const deleteJob = async (uid: any, jobId: any) => {
  const jobRef = doc(firestore, `users/${uid}/jobs`, jobId);
  await deleteDoc(jobRef);
};
