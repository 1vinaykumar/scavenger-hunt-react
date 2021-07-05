import React from "react";

function BranchCard({ branch }) {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h4 className="card-text">{branch.name}</h4>
          <strong>{branch.incharge}</strong>
          <h6>{branch.contact}</h6>
          <p>{`${branch.address}, ${branch.city}`}</p>
          <p>{branch.pincodesCovered.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default BranchCard;
