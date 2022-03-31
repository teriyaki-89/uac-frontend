import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

import App from "../App";

import store from "../app/store";
import { Provider } from "react-redux";

afterEach(cleanup);

function RenderApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe("<App />", () => {
  test("should check a Textfield", async () => {
    render(<RenderApp />);
  });
});
