import React from "react";
import WithAuth from "../hoc/withAuth";
import Layout from "components/layout";
import Dashboard from "components/dashboard/dashboard";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const DashboardPage: React.FC = () => {
  return (
    <WithAuth>
      <Layout>
        <Dashboard />
      </Layout>
    </WithAuth>
  );
};

export default DashboardPage;
