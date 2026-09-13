import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all");

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre === "all" ? null : selectedGenre },
  });

  const genresResult = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading || genresResult.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const allBooksForGenres = genresResult.data.allBooks;

  const allGenresWithDuplicates = allBooksForGenres.flatMap(
    (b) => b.genres || [],
  );
  const uniqueGenres = [...new Set(allGenresWithDuplicates)];

  return (
    <div>
      <h2>books</h2>

      {selectedGenre !== "all" && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre("all")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
