import React from "react";

export const Compose = (...Providers) => (Child) => (props) => (
  Providers.reduce((acc, Provider) => (
    <Provider>
      {acc}
    </Provider>
  ), <Child {...props} />)
)