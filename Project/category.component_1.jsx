//! demonstrating how to use gql directly inside component to get data instae dof using context
//! query type and not mutation type
//! query type and not mutation type
//! query type and not mutation type
//! query type and not mutation type
//! query type and not mutation type
//! query type and not mutation type

import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"; // to get category from URL
import { gql, useQuery } from "@apollo/client"; // Apollo GraphQL tools

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoryContainer, Title } from "./category.styles";

// 1️⃣ GraphQL query to fetch a single collection by title
//! $title is the input-data which needs to be passed into the query
const GET_CATEGORY = gql`
  query ($title: String) {
    getCollectionsByTitle(title: $title) {
      title
      id
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  // 2️⃣ Get the category name from the URL (e.g., /category/hats)
  const { category } = useParams();

  // 4️⃣ State to store the products (items) of this category
  const [products, setProducts] = useState([]);

  //! 3️⃣ Fetch collection data from GraphQL server
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { title: category }, // pass category dynamically
  });

  //! 5️⃣ Update products state when data is received from GraphQL
  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items },
      } = data;
      setProducts(items); // save items to state
    }
  }, [category, data]); // run effect when category or data changes

  // 6️⃣ Render
  return (
    <Fragment>
      {loading ? (
        // Show spinner while loading data
        <Spinner />
      ) : (
        <Fragment>
          {/* Display category title */}
          <Title>{category.toUpperCase()}</Title>

          {/* Display all products in this category */}
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

// 7️⃣ Export component to be used in routes
export default Category;
