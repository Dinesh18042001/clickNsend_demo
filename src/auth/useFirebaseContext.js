import { useContext } from "react";
//
import { AuthFirebaseContext } from "./FirebaseContext";

// ----------------------------------------------------------------------

export const useFirebaseContext = () => {
  const context = useContext(AuthFirebaseContext);

  if (!context)
    throw new Error("useAuthContext context must be use inside AuthProvider");

  return context;
};
