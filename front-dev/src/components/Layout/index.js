import { Outlet } from "react-router-dom";
import * as React from "react";
import MainHeader from "../header/MainHeader";
import GridExample from "../Grid/Grid";


class Layout extends React.Component {
  render() {
    return (
      <>
        <MainHeader />
        <Outlet />
      </>
    );
  }
}

export default Layout;
