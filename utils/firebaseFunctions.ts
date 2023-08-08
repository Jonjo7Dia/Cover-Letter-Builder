import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

export async function uploadCV(displayName: any, userId: any, file: any) {
  const storageRef = ref(storage, `${userId}/cv/${displayName} CV`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
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
