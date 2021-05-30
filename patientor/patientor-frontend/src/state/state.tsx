import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

// Reference: https://fullstackopen.com/en/part9/react_with_types#state-handling
// The state is an object with patients and diagnoses keys, which have dictionaries that take a string key and have a respective object as its value.
// This is achieved in reducer.ts, where each data undergoes "reduce" function that re-assigns each entry in the collection into a key-value pair,
// with the id and code being the key for patients and diagnoses, respectively.
export type State = {
  patients: { [id: string] : Patient | undefined };
  diagnoses: { [code: string] : Diagnosis | undefined };
};

const initialState: State = {
  patients: {},
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
