import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export async function uploadPDF(userId: any, file: any) {
  const storage = getStorage();
  const storageRef = ref(storage, `user_pdfs/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can monitor the progress here
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function savePdfToUser(userId: any, downloadURL: any) {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  await setDoc(
    userRef,
    {
      pdfLink: downloadURL,
    },
    { merge: true }
  );
}
