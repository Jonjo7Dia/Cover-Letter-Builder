import { useAuth } from "contexts/authContext";
import { useUser } from "contexts/userContext";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { firestore } from "lib/firebaseConfig";

type Job = {
  id?: string;
  companyName: string;
  dateApplied: Date;
  replied: string;
  interview: string;
  offer: string;
  position: string;
  jobAd: string;
};

function useJobs() {
  const { jobs, setJobs } = useUser();
  const { user } = useAuth();

  // Make this a helper function to avoid duplication.
  const ensureAuthenticated = () => {
    if (!user || !user.uid) {
      throw new Error(
        "Attempted to use jobs functionality without an authenticated user."
      );
    }
  };

  const fetchJobsFromFirebase = async () => {
    ensureAuthenticated();
    const userJobsCollection = collection(firestore, "users", user.uid, "jobs");
    const jobDocs = await getDocs(userJobsCollection);
    const fetchedJobs = jobDocs.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Job),
    }));
    setJobs(fetchedJobs);
  };

  const addJob = async (job: Job) => {
    ensureAuthenticated();
    const userJobsCollection = collection(firestore, "users", user.uid, "jobs");
    await addDoc(userJobsCollection, job);
    fetchJobsFromFirebase();
  };

  const updateJob = async (updatedJob: Job, docId: string) => {
    ensureAuthenticated();
    const jobDoc = doc(firestore, "users", user.uid, "jobs", docId);
    await updateDoc(jobDoc, updatedJob);
    fetchJobsFromFirebase();
  };

  const deleteJob = async (docId: string) => {
    ensureAuthenticated();
    const userJobsCollection = collection(firestore, "users", user.uid, "jobs");
    const jobDoc = doc(userJobsCollection, docId);
    await deleteDoc(jobDoc);
    fetchJobsFromFirebase();
  };

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    fetchJobsFromFirebase,
  };
}

export default useJobs;
