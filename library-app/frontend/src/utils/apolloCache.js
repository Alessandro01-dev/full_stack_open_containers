import { ALL_BOOKS } from "../queries";

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery({ query: query, variables: { genre: null } }, (oldData) => {
    if (!oldData) return;

    const bookExists = oldData.allBooks.some(
      (book) => book.id === addedBook.id,
    );
    if (bookExists) {
      return oldData;
    }

    return {
      allBooks: oldData.allBooks.concat(addedBook),
    };
  });
};
