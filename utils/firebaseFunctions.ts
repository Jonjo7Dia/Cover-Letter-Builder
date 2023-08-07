import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export async function uploadCV(userId: any, file: any) {
  const storage = getStorage();
  const storageRef = ref(storage, `${userId}/cv/${file.name}`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
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
