$url = "http://localhost:8000/books"
$contentType = "application/json"

$titles = @(
  "Do Androids Dream of Electric Sheep?",
  "The Hitchhiker's Guide to the Galaxy",
  "To Kill a Mockingbird",
  "A Clockwork Orange",
  "One Hundred Years of Solitude"
)

$authors = @(
  "Philip K. Dick",
  "Douglas Adams",
  "Harper Lee",
  "Stephen King",
  "Mauri Kunnas"
)

$body = (@{title = ($titles | Get-Random); author = ($authors | Get-Random) } | ConvertTo-Json)

$res = Invoke-RestMethod $url -Method Post -Body $body -ContentType $contentType -StatusCodeVariable statusCode

$res

$statusCode

Invoke-RestMethod $url
