async function API(body, url, method) {
  const requestParams = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (body) {
    requestParams["body"] = JSON.stringify(body);
  }

  const response = await fetch(url, requestParams);
  if (response.ok) return await response.json();
  const err = await response.json();
  throw new Error(err.error);
}

function addNewMonitor() {
  const method = "GET";
  const url = "/books";
  const bookBody = document.getElementById("bookBody");
  let body;

  API(body, url, method)
    .then((data) => console.log(data))
    .catch(alert);
}

addNewMonitor();
