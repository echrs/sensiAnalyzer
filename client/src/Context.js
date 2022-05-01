import React from "react";
import { fetchAllIngredients, getCurrentUser, fetchAllFilters } from "./api/index.js";

export const Context = React.createContext({});

export const Provider = (props) => {
  const user = getCurrentUser();

  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    fetchAllIngredients().then((resp) => {
      setIngredients(resp.data);
    });
  }, []);
  
  const [filters, setFilters] = React.useState([]);
  
  React.useEffect(() => {
    fetchAllFilters(user?.userId).then((resp) => {
      let filters = resp.data.map((item) => {
        return {
          ...item,
          checked: false,
          found: false,
        };
      });
      setFilters(filters);
    });
  }, []);

  return (
    <Context.Provider value={{ ingredientCtx: [ingredients, setIngredients], filterCtx: [filters, setFilters] }}>
      {props.children}
    </Context.Provider>
  );
};
