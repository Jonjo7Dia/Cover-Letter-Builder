import "styles/global.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "components/layout";
import TermsPopUp from "components/tocPopUp";
import React, { useEffect, useState } from "react";
import Hero from "components/hero/hero";
import Usp from "components/usp/usp";
import Footer from "components/footer/footer";
import Link from "next/link";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";

config.autoAddCss = false;

export default function Index() {
  const [acceptedTOC, setAcceptedTOC] = useState<boolean>(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Once we're on the client, check if the value is actually in localStorage
    const isAccepted = JSON.parse(
      localStorage.getItem("userHasAcceptedTOC") || "false"
    );
    setAcceptedTOC(isAccepted);
  }, []);

  useEffect(() => {
    localStorage.setItem("userHasAcceptedTOC", JSON.stringify(acceptedTOC));
  }, [acceptedTOC]);

  const tocHandler = (input: boolean) => {
    setAcceptedTOC(input);
  };

  return (
    <Layout>
      {!acceptedTOC && <TermsPopUp setTOC={tocHandler} />}

      {acceptedTOC && <Hero />}
      {acceptedTOC && <Usp />}

      <Footer>
        <Link href="mailto:contact@tailoredapplication.com">
          contact@tailoredapplication.com
        </Link>
        <Link href="/terms-and-conditions"> Terms and Conditions</Link>
      </Footer>
    </Layout>
  );
}
