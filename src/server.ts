import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak/mod.ts";

import {
  bookListController,
  bookGetController,
  bookPostController,
  indexController,
  errorController,
} from "./controllers.ts";

const port = 8000;
const router = new Router();
const app = new Application();

const workingDirectory = Deno.cwd();

router
  .get("/empty", indexController)
  .get("/books", bookListController)
  .get("/books/:id", bookGetController)
  .post("/books", bookPostController);

app.use(errorController);
app.use(router.routes());
app.use(router.allowedMethods());

// static controller
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${workingDirectory}/static`,
    index: "index.html",
  });
});

console.log(`Deno rest api started at http://localhost:${port}/`);

await app.listen({ port });
