import { createContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

// 1️⃣ Create a React Context to share categories across components
export const CategoriesContext = createContext({
  categoriesMap: {}, // default value
});

//! GraphQL Query
//! GraphQL Query
// 2️⃣ Define the GraphQL query to get all collections and their items
const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

// 3️⃣ Create a Provider component to wrap your app
export const CategoriesProvider = ({ children }) => {
  // State to store categories as a map (key = collection title)
  const [categoriesMap, setCategoriesMap] = useState({});

  //! Run the GraphQL query using useQuery()
  //! Run the GraphQL query using useQuery()
  //? but where is GraphQL getting the data from? from the backend, backend has the data, which we have not coded yet
  //? instructor already has backend coded, so we are using it.
  //? so once backedn is coded, we can query and useQuery() like this.
  const { loading, error, data } = useQuery(COLLECTIONS);

  // 4️⃣ When data is fetched, transform it into a map
  useEffect(() => {
    if (data) {
      const { collections } = data;

      // Convert array of collections into an object
      // Example: { hats: [...items], jackets: [...items] }
      const collectionsMap = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items; // lowercase keys for easier access
        return acc;
      }, {});

      // Save the map to state
      setCategoriesMap(collectionsMap);
    }
  }, [data]);

  // 5️⃣ Prepare the value to provide to all components
  const value = { categoriesMap, loading, error };

  // 6️⃣ Wrap children with Context Provider
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
