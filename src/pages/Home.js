import React, { useState } from "react";
import { useRef } from "react";
import BranchCard from "../components/BranchCard";
import { action, types } from "../state";
import useAPI from "../utils/useAPI";
import useAppState from "../utils/useAppState";

function Home() {
  const { state, dispatch } = useAppState();
  const { getServingBranches } = useAPI();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [searched, setSearched] = useState(false);
  const resultsRef = useRef(null);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <form
        className="row form-group my-5 justify-content-center"
        onSubmit={(event) => {
          event.preventDefault();
          getServingBranches({ pincode, name, email, mobile });
          setSearched(true);
          resultsRef.current.scrollIntoView();
        }}
      >
        <div className="col-10 col-md-5 my-2">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="col-10 col-md-5 my-2">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-10 col-md-5 my-2">
          <label className="form-label">Mobile</label>
          <input
            className="form-control"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
        <div className="col-10 col-md-5 my-2">
          <label className="form-label">Pincode</label>
          <input
            type="search"
            className="form-control"
            value={pincode}
            required
            onChange={(event) => setPincode(event.target.value)}
          />
        </div>
        <div className="col-10 col-md-5 my-2">
          <button
            className="btn btn-primary my-3 w-100"
            disabled={pincode.length !== 6}
            type="submit"
          >
            Search
          </button>
          <button
            className="btn btn-warning my-3 w-100"
            type="reset"
            onClick={() => {
              setEmail("");
              setMobile("");
              setName("");
              setPincode("");
              setSearched(false);
              dispatch(action(types.GET_SERVING_BRANCHES_SUCCESS, []));
            }}
          >
            Clear
          </button>
        </div>
      </form>
      <div
        ref={resultsRef}
        className="row mx-5 row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 w-100 justify-content-center vh-100"
      >
        {state?.servingBranches?.list?.length > 0 ? (
          state?.servingBranches?.list?.map?.((branch) => (
            <BranchCard key={branch.name} branch={branch} />
          ))
        ) : searched ? (
          <>
            <h3 className="text-center col-12 mt-5">
              Bad Bad luck, No Donut for you!!&nbsp;
              <button
                className="btn btn-info"
                onClick={() => window.scrollTo(0, 0)}
              >
                Search again
              </button>
            </h3>
          </>
        ) : (
          <h1 className="text-center col-12 text-info">
            Welcome to Scavenger Hunt Application
          </h1>
        )}
      </div>
    </div>
  );
}

export default Home;
