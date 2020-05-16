import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { writeJsonSync } from "https://deno.land/std/fs/write_json.ts";

const dbFilePath = "./db.json";

interface Book {
  title: string;
  author: string;
  id?: number;
}

function getDb(): Book[] {
  let books: Book[];
  try {
    books = readJsonSync(dbFilePath) as Book[];
    return books;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function getBooks(): Map<string, Book> {
  const booksMap = new Map<string, Book>();
  const books: Book[] = getDb();

  books.forEach((book: Book) => {
    booksMap.set(`${book.id}`, book);
  });

  return booksMap;
}

function writeBook(book: Book): Book {
  const db: Book[] = getDb();

  book.id = db.length + 1;
  db.push(book);
  writeJsonSync(dbFilePath, db);
  return book;
}

export { getBooks, writeBook, Book };
