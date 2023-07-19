import { useEffect } from "react";
import { usePlausible } from "next-plausible";

export const usePageViewTracking = (pageName: string) => {
  const plausible = usePlausible();

  useEffect(() => {
    plausible("pageview", { u: pageName });
  }, [plausible, pageName]);
};
