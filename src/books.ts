import { getBooks, writeBook } from "./db.ts";

const bookListController = async (context: any) => {
  const books = getBooks();
  context.response.body = Array.from(books.values());
};

const bookGetController = async (context: any) => {
  const books = getBooks();
  if (context.params && context.params.id && books.has(context.params.id)) {
    context.response.body = books.get(context.params.id);
  }
};

const bookPostController = async (context: any) => {
  try {
    const {
      value: { title, author },
    } = await context.request.body();
    const book = writeBook({ title, author });
    context.response.body = JSON.stringify(book);
    context.response.status = 201;
  } catch (error) {
    context.response.body = JSON.stringify({ error: error.toString() });
    context.response.status = 400;
  }
};

export { bookListController, bookGetController, bookPostController };
