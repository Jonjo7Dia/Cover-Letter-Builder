import React from "react";
import WithAuth from "../hoc/withAuth";
import Layout from "components/layout";

const Dashboard: React.FC = () => {
  return (
    <WithAuth>
      <Layout>
        <h1>Welcome to Dashboard</h1>
      </Layout>
    </WithAuth>
  );
};

export default Dashboard;
