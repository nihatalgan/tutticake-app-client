import { createContext, useState } from "react";

const OrderContext = createContext();

function OrderProviderWrapper(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    // <== ADD
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <OrderContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProviderWrapper };
