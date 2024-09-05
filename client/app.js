const form = document.getElementById("form");

async function handleSubmit(event) {
  event.preventDefault();

  // get the information from our form as an object
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  //call our API POST end point
  const response = await fetch("https://user-inputs-post1.onrender.com/jokes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  console.log("From the server:", responseData);
  form.reset();
  getJokes();
}

form.addEventListener("submit", handleSubmit);

//get all the jokes from the database and diplay them

const jokesContainer = document.getElementById("jokes");

async function getJokes() {
  const response = await fetch("https://user-inputs-post1.onrender.com/jokes");
  const jokes = await response.json();
  console.log(jokes);
  jokesContainer.innerHTML = "";
  jokes.forEach((joke) => {
    const p = document.createElement("p");
    p.textContent = `${joke.id}: ${joke.setup}... ${joke.punchline}`;
    jokesContainer.appendChild(p);
  });
}

getJokes();
