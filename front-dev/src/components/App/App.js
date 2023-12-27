import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login.js";
import AuthProvider from "../../hoc/AuthProvider";
import RequireAuth from "../../hoc/RequireAuth";
import Layout from "../Layout";

import GridExample from "../Grid/Grid";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />}></Route>
          <Route
            path="/main"
            element={
              <RequireAuth role={["USER", "HEAD_OF_DEPARTMENT", "RECTOR"]}>
                <GridExample/>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
