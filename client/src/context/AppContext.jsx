import { toast } from "react-toastify";
import { createContext, useState } from "react";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(0);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const backendURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

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

  const removeBg = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      setImage(image);
      setResultImage(false);
      navigate("/result");
      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);
      const { data } = await axios.post(
        backendURL + `/api/image/remove-bg`,
        formData,
        {
          headers: { token },
        },
      );
      if (data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredit(data.creditBalance);
      } else {
        toast.error(data.message);
        data.creditBalance && setCredit(data.creditBalance);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{ credit, loadCreditsData, image, setImage, removeBg }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
