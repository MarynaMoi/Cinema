const BOOKS = {
  fantazy: [
    {
      id: 1,
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      year: 1954,
    },
    {
      id: 2,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      year: 1937,
    },
    {
      id: 3,
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      year: 1997,
    },
    {
      id: 4,
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      year: 1996,
    },
  ],
  scienceFiction: [
    {
      id: 1,
      title: 'Dune',
      author: 'Frank Herbert',
      year: 1965,
    },
    {
      id: 2,
      title: 'Neuromancer',
      author: 'William Gibson',
      year: 1984,
    },
    {
      id: 3,
      title: 'Foundation',
      author: 'Isaac Asimov',
      year: 1951,
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      year: 1948,
    },
  ],
};

const {
  fantazy: [, , hp],
  scienceFiction: [, , , { author: writer } = go],
} = BOOKS;
// const [,,hp] = fantazy
// const [,,,{author: writer} = go] = scienceFiction
console.log(writer);
console.log(hp);
