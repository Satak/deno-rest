# Deno REST API

Testing Deno as a REST API backend. Written in poor and hacky TypeScript since Deno supports TS natively.

- <https://deno.land/>
- <https://doc.deno.land/https/deno.land/x/oak/mod.ts>

Run deno dev server: `run-deno.ps1`

## Info

- Port: `8000`
- DB: Local JSON file `.\src\db.json`
- Test post request: `post.ps1`
- Main server script: `server.ts`

## Routes

| Route         | Method | Info                                                                 |
| ------------- | ------ | -------------------------------------------------------------------- |
| `/books`      | `GET`  | List all books in a JSON array                                       |
| `/books/{id}` | `GET`  | Get 1 book object by ID                                              |
| `/books`      | `POST` | Post new book `{title: string, author: string}` (`application/json`) |
