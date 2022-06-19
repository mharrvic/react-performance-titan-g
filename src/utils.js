import React from "react";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const useForceRerender = () => React.useReducer((x) => x + 1, 0)[1];
