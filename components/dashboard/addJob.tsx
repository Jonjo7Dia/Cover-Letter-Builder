import React, { useState } from "react";
import styles from "styles/dashboard/appliedJobs.module.scss";
import InputString from "ui/inputs/inputString";
import InputDate from "ui/inputs/inputDate";
import InputText from "ui/inputs/inputText";

type addJobProps = {
  close: () => void;
  addJob: (
    company: string,
    date: string,
    position: string,
    jobAd: string | ""
  ) => void;
};

const AddJob: React.FC<addJobProps> = ({ close, addJob }) => {
  const [companyName, setCompanyName] = useState("");
  const [applicationRole, setApplicationRole] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [jobAdvertisement, setJobAdvertisement] = useState("");

  function formatDate(date: Date) {
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }

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
            placeholder={formatDate(new Date())}
            inputTitle={"Application date"}
            onChange={(date) => {
              setApplicationDate(date);
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
