import React, { useState } from "react";
import context from "../Context/contextPagination";
import defaultState from "../Default State/state";

export default function (props) {
  const [state, setState] = useState(defaultState);
  const createButtonsIndex = () => {
    const buttons = [];
    let index = 0;
    while (index < state.totalPages) {
      buttons.push(<button key={index}>{index + 1}</button>);
      index++;
    }

    return buttons;
  };
  return (
    <context.Provider value={defaultState}>
      {props.children}
      {createButtonsIndex()}
    </context.Provider>
  );
}
