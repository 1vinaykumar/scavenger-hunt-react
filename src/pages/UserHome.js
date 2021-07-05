import React from "react";
import useAppState from "../utils/useAppState";

function UserHome() {
  const { state } = useAppState();
  return (
    <div className="container">
      <h1 className="text-center text-muted my-5">User Home</h1>

      <dl className="text-center my-5">
        <dt>Name</dt>
        <dd>{state?.user?.details?.branchDetails?.name}</dd>

        <dt>Incharge</dt>
        <dd>{state?.user?.details?.branchDetails?.incharge}</dd>

        <dt>Contact</dt>
        <dd>{state?.user?.details?.branchDetails?.contact}</dd>

        <dt>Institute Name</dt>
        <dd>{state?.user?.details?.branchDetails?.instituteName}</dd>

        <dt>City</dt>
        <dd>{state?.user?.details?.branchDetails?.city}</dd>

        <dt>Address</dt>
        <dd>{state?.user?.details?.branchDetails?.address}</dd>

        <dt>Pincodes Covered</dt>
        <dd>
          {state?.user?.details?.branchDetails?.pincodesCovered?.join(", ")}
        </dd>
      </dl>
    </div>
  );
}

export default UserHome;
