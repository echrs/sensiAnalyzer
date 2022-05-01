import React from "react";
import {
  fetchAllIngredients,
  getCurrentUser,
  fetchAllFilters,
} from "./api/index.js";

export const Context = React.createContext({});

export const Provider = (props) => {
  const user = getCurrentUser();

  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    fetchAllIngredients().then((resp) => {
      setIngredients(resp.data);
    });
  }, []);

  const [visibleFilters, setVisibleFilters] = React.useState([]);
  const [allFilters, setAllFilters] = React.useState([]);

  const fetchFilters = () => {
    fetchAllFilters(user?.userId).then((resp) => {
        setAllFilters(resp.data);
        let filters = resp.data
          .map((item) => {
            return {
              ...item,
              checked: false,
              found: false,
            };
          })
          .filter((item) => item.visibility === true);
        setVisibleFilters(filters);
    });
  }

  React.useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <Context.Provider
      value={{
        ingredientCtx: [ingredients, setIngredients],
        visibleFilterCtx: [visibleFilters, setVisibleFilters],
        allFilterCtx: [allFilters, setAllFilters, fetchFilters],
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
