'use client'

import { createContext, useState } from "react";
import { ICalculatorContent } from "../interfaces/ICalculatorContent";

export type CalculatorContentType = {
  inputs: ICalculatorContent;
  setInputs: (c: ICalculatorContent) => void;
};

const CalculatorContext = createContext<CalculatorContentType | null>(null);

export default CalculatorContext;



export const CalculatorContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [inputs, setInputs] = useState<ICalculatorContent>({
    currency: "AED",
    callback: false,
    businessactivity: undefined,
    businessactivitySelected: "",
    premises: undefined,
    premisesSelected: "",
    owners: "1",
    visas: "1",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    nationality: "",
    timeline: undefined,
    timelineSelected: "",
  });

  return (
    <CalculatorContext.Provider value={{ inputs, setInputs }}>
      {children}
    </CalculatorContext.Provider>
  );
};