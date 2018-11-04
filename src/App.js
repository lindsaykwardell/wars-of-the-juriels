import React, { Component } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//import Header from "./components/Frame/Header";
import Home from "./page/Home/Home";

library.add(faBars);

class App extends Component {
  state = {
    drawerIsOpen: true
  };

  openDrawerHandler = () => {
    this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
  };

  render() {
    return (
      <div style={{ background: "#333" }}>
        <Home />
      </div>
    );
  }
}

export default App;
