/* eslint-disable react/no-unescaped-entities */
import "styles/global.scss";
import styles from "styles/pages/terms.module.scss";
import Layout from "components/layout";
import SubmitButton from "ui/buttons/submit";
import { useRouter } from "next/router";
import { useTracking } from "tracking/useTracking";
import Footer from "components/footer/footer";
import Link from "next/link";
import { useState, useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export default function TermsAndConditions() {
  const { trackAcceptTerms } = useTracking();
  const router = useRouter();
  const [acceptedTOC, setAcceptedTOC] = useState<boolean>(true);

  useEffect(() => {
    // Once we're on the client, check if the value is actually in localStorage
    const isAccepted = JSON.parse(
      localStorage.getItem("userHasAcceptedTOC") || "false"
    );
    setAcceptedTOC(isAccepted);
  }, []);
  const handleAccept = () => {
    trackAcceptTerms();
    localStorage.setItem("userHasAcceptedTOC", "true");
    router.push("/");
  };

  return (
    <Layout>
      {
        <div className={styles["terms"]}>
          <h1>Terms & Conditions</h1>

          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>

          <h2>Interpretation and Definitions</h2>

          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3>Definitions</h3>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul>
            <li>"Service" refers to the application.</li>
            <li>
              "You" means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </li>
          </ul>

          <h2>Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>

          <h2>Service Description</h2>
          <p>
            This Service allows You to upload a curriculum vitae (CV) which may
            include but is not limited to phone numbers, names, emails,
            addresses, and images. This data is processed using a pdf-parser
            library. Users then input a job application, which is sent to OpenAI
            for the generation of a cover letter.
          </p>

          <h2>User Consent and Data Use</h2>
          <p>
            Our Service employs the OpenAI API to process certain user-provided
            data. Please be aware that the data you provide to our Service is
            used in this manner. We urge you to refrain from providing any data
            you are not comfortable sharing with the OpenAI API.
          </p>
          <p>
            We have chosen to opt-out of OpenAIs data sharing option. This means
            that any data submitted to and generated by the OpenAI API through
            our Service is not used by OpenAI to train their models or improve
            their services. We have made this choice to prioritize the privacy
            of our users.
          </p>
          <p>
            In addition, we use Plausible for website tracking purposes.
            Plausible collects metadata about your visit, including your IP
            address and the pages you view. However, we don't use Plausible to
            collect any personally identifiable information about you. The
            purpose of this tracking is to help us improve our service,
            understand our user base, and provide you with a better user
            experience. You can read more about how Plausible handles data in
            their{" "}
            <a
              href="https://plausible.io/data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Policy
            </a>
            .
          </p>
          <p>
            By using our Service, you acknowledge and agree to this use of data.
            Please note that the usage of the OpenAI API is subject to OpenAIs
            own terms and conditions, which can be found{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>

          <h2>Prohibited Activities</h2>
          <p>The following activities are prohibited:</p>
          <ul>
            <li>
              Illegal activity, including but not limited to child sexual abuse
              material or any content that exploits or harms children,
              generation of hateful, harassing, or violent content, generation
              of malware, and activity that has high risk of physical harm.
            </li>
            <li>
              Activity that has high risk of economic harm, including
              multi-level marketing, gambling, payday lending, automated
              determinations of eligibility for credit, employment, educational
              institutions, or public assistance services, and fraudulent or
              deceptive activity.
            </li>
            <li>
              Adult content, adult industries, and dating apps, including
              content meant to arouse sexual excitement, such as the description
              of sexual activity, or that promotes sexual services (excluding
              sex education and wellness), erotic chat, and pornography.
            </li>
            <li>Political campaigning or lobbying.</li>
            <li>
              Activity that violates people’s privacy, including tracking or
              monitoring an individual without their consent, facial recognition
              of private individuals, classifying individuals based on protected
              characteristics, using biometrics for identification or
              assessment, unlawful collection or disclosure of personal
              identifiable information or educational, financial, or other
              protected records.
            </li>
            <li>
              Engaging in the unauthorized practice of law, offering tailored
              legal advice without a qualified person reviewing the information,
              offering tailored financial advice without a qualified person
              reviewing the information, telling someone that they have or do
              not have a certain health condition, or providing instructions on
              how to cure or treat a health condition.
            </li>
            <li>
              High risk government decision-making, including law enforcement
              and criminal justice, migration and asylum.
            </li>
          </ul>
          <p>
            Violation of these rules may result in your access to the Service
            being suspended or terminated.
          </p>

          <h2>Changes to These Terms and Conditions</h2>
          <p>
            We reserve the right, at Our sole discretion, to modify or replace
            these Terms at any time. If a revision is material We will make
            reasonable efforts to provide at least 30 days notice prior to any
            new terms taking effect. What constitutes a material change will be
            determined at Our sole discretion.
          </p>

          <p>This document was last updated on July 19, 2023.</p>

          {!acceptedTOC && (
            <SubmitButton
              text={"Accept"}
              disabled={false}
              onClick={handleAccept}
            />
          )}
        </div>
      }
      <Footer>
        <Link href="/"> Home</Link>
      </Footer>
    </Layout>
  );
}
