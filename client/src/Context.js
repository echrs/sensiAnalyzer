import React from "react";
import {
  fetchAllIngredients,
  getCurrentUser,
  fetchAllFilters,
  fetchAllProducts
} from "./api/index.js";

export const Context = React.createContext({});

export const Provider = (props) => {
  const user = getCurrentUser();

  const [ingredients, setIngredients] = React.useState([]);

  const [visibleFilters, setVisibleFilters] = React.useState([]);
  const [allFilters, setAllFilters] = React.useState([]);

  const [allProducts, setAllProducts] = React.useState([]);

  React.useEffect(() => {
    fetchAllIngredients().then((resp) => {
      setIngredients(resp.data);
    });
    fetchFilters();
    fetchProducts();
  }, []);

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

  const fetchProducts = () => {
    fetchAllProducts(user?.userId).then((resp) => {
      let prods = resp.data
      .map((item) => {
        return {
          ...item,
          ingrListStr: item.ingrList.join(", ").toLowerCase()
        };
      })
      setAllProducts(prods);
    });
  }

  return (
    <Context.Provider
      value={{
        ingredientCtx: [ingredients, setIngredients],
        visibleFilterCtx: [visibleFilters, setVisibleFilters],
        allFilterCtx: [allFilters, setAllFilters, fetchFilters],
        allProductCtx: [allProducts, setAllProducts, fetchProducts],
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
