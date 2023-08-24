import React, { useState } from "react";
import styles from "styles/dashboard/appliedJobs.module.scss";
import InputString from "ui/inputs/inputString";
import InputDate from "ui/inputs/inputDate";
import InputText from "ui/inputs/inputText";

type addJobProps = {
  close: () => void;
  addJob: (
    company: string,
    date: Date,
    position: string,
    jobAd: string | ""
  ) => void;
};

const AddJob: React.FC<addJobProps> = ({ close, addJob }) => {
  const [companyName, setCompanyName] = useState("");
  const [applicationRole, setApplicationRole] = useState("");
  const [applicationDate, setApplicationDate] = useState(new Date());
  const [jobAdvertisement, setJobAdvertisement] = useState("");
  return (
    <div className={styles["addJob"]}>
      <form
        className={styles["addJob__form"]}
        onSubmit={(e) => {
          e.preventDefault();
          addJob(
            companyName,
            applicationDate,
            applicationRole,
            jobAdvertisement
          );
        }}
      >
        <div className={styles["addJob__left"]}>
          <InputString
            placeholder="Company Name"
            inputTitle={"Add Company Title"}
            onChange={(value) => {
              setCompanyName(value);
            }}
            required={true}
          />
          <InputString
            placeholder="Front end engineer"
            inputTitle={"Add Application role"}
            onChange={(value) => {
              setApplicationRole(value);
            }}
            required={true}
          />
          <InputDate
            placeholder={new Date().toDateString()}
            inputTitle={"Application date"}
            onChange={(date) => {
              setApplicationDate(new Date(date));
            }}
            required={true}
          />
        </div>
        <div className={styles["addJob__right"]}>
          <h4 className={styles["addJob__adTitle"]}>
            Add the job application (optional)
          </h4>
          <InputText
            placeholder={"Add job advertisement"}
            onChange={(value) => {
              setJobAdvertisement(value);
            }}
          />
          <div className={styles["addJob__buttons"]}>
            <button
              className={`${styles["addJob__submit"]} ${styles["addJob__cancel"]}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent the form from being submitted
                close(); // Close the modal
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles["addJob__submit"]}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
