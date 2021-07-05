import React, { useEffect } from "react";
import BranchCard from "../components/BranchCard";
import useAPI from "../utils/useAPI";
import useAppState from "../utils/useAppState";

function AdminHome() {
  const { state } = useAppState();
  const { getBranches } = useAPI();

  useEffect(() => {
    getBranches();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h1 className="text-center text-muted my-5">Admin Home</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 w-100 justify-content-center">
        {state?.branches?.list?.map?.((branch) => (
          <BranchCard key={branch.name} branch={branch} />
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
