import React from "react";

import "./styles.css";
const lazyImport = (path, componentName) => {
  return import(/* webpackChunkName: "[request]" */ `${path}/${componentName}`);
};

const Home = React.lazy(() => lazyImport("./pages", "Home"));

export default function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}
