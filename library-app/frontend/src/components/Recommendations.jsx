import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { ME, ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const userResult = useQuery(ME);
  const favoriteGenre = userResult.data?.me?.favoriteGenre;

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  useEffect(() => {
    if (props.show) {
      userResult.refetch();
    }
  }, [props.show]);

  if (!props.show) {
    return null;
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  const user = userResult.data?.me;
  const recommendedBooks = booksResult.data?.allBooks || [];

  if (!user) {
    return <div>please log in to see recommendations</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
