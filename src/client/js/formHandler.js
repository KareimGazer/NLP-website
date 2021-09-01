function handleSubmit(event) {
  event.preventDefault();

  // make a post req to send the url
  // followed by a get req to get the data

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/test")
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    });
}

export { handleSubmit };
