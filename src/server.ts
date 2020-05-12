import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import {
  bookListController,
  bookGetController,
  bookPostController,
} from "./books.ts";

const port = 8000;
const router = new Router();

const indexController = async (context: any) => {
  context.response.body = "Navigate to /books";
};

router
  .get("/", indexController)
  .get("/books", bookListController)
  .get("/books/:id", bookGetController)
  .post("/books", bookPostController);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Deno rest api started at http://localhost:${port}/`);

await app.listen({ port });
