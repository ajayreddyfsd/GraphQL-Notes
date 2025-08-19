//! demonstrating how to use gql directly inside component to get data instead of using context
//! and also how to modify data directly using useMutation() instead of using context
//! query type and mutation type
//! query type and mutation type
//! query type and mutation type
//! query type and mutation type
//! query type and mutation type

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// 1️⃣ Define a GraphQL mutation
// This mutation tells the backend to add a like to a post with a specific postId.
// It returns the updated post id and likes count.
const ADD_LIKE = gql`
  mutation AddLike($postId: ID!) {
    addLike(postId: $postId) {
      id
      likes
    }
  }
`;

const LikeButton = ({ postId, initialLikes }) => {
  // 2️⃣ Local React state to store the number of likes
  // We start with the initialLikes passed as a prop
  // This allows us to show updated likes immediately in the UI
  const [likes, setLikes] = useState(initialLikes);

  // 3️⃣ useMutation hook from Apollo Client
  // This prepares the `addLike` function to call the mutation
  // `loading` tells us if the mutation is currently running
  // `error` tells us if something went wrong during the mutation
  const [addLike, { loading, error }] = useMutation(ADD_LIKE, {
    // 4️⃣ onCompleted runs automatically after the mutation succeeds
    // The `data` parameter contains the response from the backend
    onCompleted: (data) => {
      // We update the local `likes` state with the new likes count from the backend
      setLikes(data.addLike.likes);
    },
  });

  // 5️⃣ Function to handle button click
  const handleLike = () => {
    // Call the mutation function and pass the postId as a variable
    addLike({ variables: { postId } });
    // While the mutation is running, `loading` becomes true
    // Once it completes, `onCompleted` updates the UI
  };

  return (
    <div>
      {/* 6️⃣ Button to trigger the mutation */}
      {/* Disabled while the mutation is running to prevent multiple clicks */}
      <button onClick={handleLike} disabled={loading}>
        {/* Show 'Liking...' when mutation is in progress */}
        {loading ? "Liking..." : "Like"}
      </button>

      {/* 7️⃣ Show error if mutation fails */}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {/* 8️⃣ Display the current likes count */}
      <p>Likes: {likes}</p>
    </div>
  );
};

export default LikeButton;

