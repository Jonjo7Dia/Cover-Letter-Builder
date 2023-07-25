import React from "react";
import WithAuth from "../hoc/withAuth";
import Layout from "components/layout";
import Dashboard from "components/dashboard/dashboard";
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
