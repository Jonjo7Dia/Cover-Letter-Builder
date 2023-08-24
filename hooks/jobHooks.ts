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
  const jobsCollection = collection(firestore, "jobs");

  const fetchJobsFromFirebase = async () => {
    const jobDocs = await getDocs(jobsCollection);
    const fetchedJobs = jobDocs.docs.map((doc) => doc.data() as Job);
    setJobs(fetchedJobs);
  };

  const addJob = async (job: Job) => {
    await addDoc(jobsCollection, job);
    fetchJobsFromFirebase();
  };

  const updateJob = async (updatedJob: Job, docId: string) => {
    const jobDoc = doc(firestore, "jobs", docId);
    await updateDoc(jobDoc, updatedJob);
    fetchJobsFromFirebase();
  };

  const deleteJob = async (docId: string) => {
    const jobDoc = doc(firestore, "jobs", docId);
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
