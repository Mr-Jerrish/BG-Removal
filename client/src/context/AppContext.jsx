import { toast } from "react-toastify";
import { createContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(0);
  const backendURL = import.meta.env.VITE_API_URL;
  const { getToken } = useAuth();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendURL + `/api/user/credits`, {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <AppContext.Provider value={{ credit, loadCreditsData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
