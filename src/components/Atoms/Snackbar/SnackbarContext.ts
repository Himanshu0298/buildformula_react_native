import React from "react";
import { SnackBarContextType } from "./SnackbarProvider";

const SnackbarContext = React.createContext<SnackBarContextType | undefined>(
  undefined
);
export default SnackbarContext;
