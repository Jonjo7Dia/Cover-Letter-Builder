import { usePlausible } from "next-plausible";

export const useTracking = () => {
  const plausible = usePlausible();

  const trackUpload = () => {
    plausible("Upload CV");
  };

  const trackJob = () => {
    plausible("Paste Job Application");
  };

  const trackDownload = () => {
    plausible("Download Cover Letter");
  };

  const trackError = (error: string) => {
    plausible("GPT Error", { props: { error: error } });
  };

  const trackAcceptTerms = () => {
    plausible("Accept Terms");
  };

  const trackCopyCoverLetter = () => {
    plausible("Copy Letter");
  };

  return {
    trackDownload,
    trackJob,
    trackUpload,
    trackError,
    trackAcceptTerms,
    trackCopyCoverLetter,
  };
};
