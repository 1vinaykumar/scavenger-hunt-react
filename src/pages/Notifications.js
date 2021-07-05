import React from "react";
import useAppState from "../utils/useAppState";

function Notifications() {
  const { state } = useAppState();
  return (
    <div className="row my-5 justify-content-center">
      <ul className="list-group list-group-flush col-10">
        {state?.notifications?.list.length > 0 ? (
          state?.notifications?.list?.map?.((item, index) => (
            <li key={item._id ?? index} className="list-group-item d-flex">
              <div className="card-body w-50">
                <div className="card-text fw-bold">{item.message}</div>
                <p>{item.timestamp}</p>
              </div>
              <div className="card-body w-50">
                <div className="card-text fw-bold">{item?.details?.name}</div>
                <p>
                  {item?.details?.email}, {item?.details?.mobile}
                </p>
              </div>
            </li>
          ))
        ) : (
          <h1 className="text-center text-warning">No Notifications</h1>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
