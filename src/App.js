import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes";
import { useReducer } from "react";
import { initialState, reducer, store } from "./state";
import { SnackbarProvider } from "notistack";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <store.Provider value={{ state, dispatch }}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <AppRoutes />
      </SnackbarProvider>
    </store.Provider>
  );
}

export default App;
