import * as React from "react";
import { useAuth } from "@clerk/clerk-expo";

interface DataProps {
  tabBarHeight: number | null;
  setTabBarHeight: React.Dispatch<React.SetStateAction<number | null>>;
  token: string;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const DataContext = React.createContext<DataProps | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [tabBarHeight, setTabBarHeight] = React.useState<number | null>(null);
  const [token, setToken] = React.useState("");

  const { getToken } = useAuth();

  React.useEffect(() => {
    const init = async () => {
      const token = await getToken();
      setToken(token);
    };

    init();
  }, []);

  return (
    <DataContext.Provider
      value={{
        tabBarHeight,
        setTabBarHeight,
        token,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataContextProvider");
  }

  return context;
};
