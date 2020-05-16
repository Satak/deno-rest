import { getBooks, writeBook, Book } from "./db.ts";

interface ErrorBody {
  errorMessage: string;
  error?: string;
}

function newBookDataIsValid(title: string, author: string): boolean {
  return (
    typeof title === "string" &&
    typeof author === "string" &&
    title !== "" &&
    author !== ""
  );
}

const bookListController = async (context: any) => {
  const books = getBooks();
  context.response.body = JSON.stringify(Array.from(books.values()));
  context.response.type = "application/json";
};

const bookGetController = async (context: any) => {
  const books = getBooks();
  let body: string;
  let status: number;
  const bookFound =
    context.params && context.params.id && books.has(context.params.id);

  if (bookFound) {
    body = JSON.stringify(books.get(context.params.id));
    status = 200;
  } else {
    body = JSON.stringify({ error: "404 no record found" });
    status = 404;
  }

  context.response.type = "application/json";
  context.response.status = status;
  context.response.body = body;
};

const bookPostController = async (context: any) => {
  const errorMessage =
    'Please post book object with title and author keys and values in string format. Example: {"author": "myAuthor", "title": "myTitle"}';
  let status = 400;
  let body: Book | ErrorBody;

  try {
    const {
      value: { title, author },
    } = await context.request.body();

    if (newBookDataIsValid(title, author)) {
      body = writeBook({ title, author });
      status = 201;
    } else {
      body = {
        errorMessage,
      };
    }
  } catch (error) {
    body = {
      errorMessage,
      error: error.toString(),
    };
  }

  context.response.status = status;
  context.response.body = JSON.stringify(body);
  context.response.type = "application/json";
};

export { bookListController, bookGetController, bookPostController };
