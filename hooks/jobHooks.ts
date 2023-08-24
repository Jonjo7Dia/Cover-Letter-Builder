import { useAuth } from "contexts/authContext";
import { useUser } from "contexts/userContext";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { firestore } from "lib/firebaseConfig";

type Job = {
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
  if (!user || !user.uid) {
    throw new Error(
      "Attempted to use jobs hook without an authenticated user."
    );
  }

  const userJobsCollection = collection(firestore, "users", user.uid, "jobs");

  const fetchJobsFromFirebase = async () => {
    const jobDocs = await getDocs(userJobsCollection);
    const fetchedJobs = jobDocs.docs.map((doc) => doc.data() as Job);
    setJobs(fetchedJobs);
  };

  const addJob = async (job: Job) => {
    await addDoc(userJobsCollection, job);
    fetchJobsFromFirebase();
  };

  const updateJob = async (updatedJob: Job, docId: string) => {
    const jobDoc = doc(firestore, "users", user.uid, "jobs", docId);
    await updateDoc(jobDoc, updatedJob);
    fetchJobsFromFirebase();
  };

  const deleteJob = async (docId: string) => {
    const jobDoc = doc(firestore, "users", user.uid, "jobs", docId);
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
