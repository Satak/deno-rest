import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { writeJsonSync } from "https://deno.land/std/fs/write_json.ts";

const dbFilePath = "./db.json";

interface Book {
  id: number;
  title: string;
  author: string;
}

function getDb() {
  let dbFile: any;
  try {
    dbFile = readJsonSync(dbFilePath);
  } catch (error) {
    console.log(error);
  }

  return dbFile || [];
}

function getBooks() {
  const books = new Map<string, Book>();
  const db: any = getDb();

  if (!db.length) return books;

  db.forEach((book: Book) => {
    books.set(`${book.id}`, book);
  });

  return books;
}

function writeBook(book: any) {
  const db: any = getDb();
  const id: number = db.length + 1;

  book.id = id;
  db.push(book);
  writeJsonSync("./db.json", db);
  return book;
}

export { getBooks, writeBook };
