function handleSubmit(event) {
  event.preventDefault();

  // make a post req to send the url
  // followed by a get req to get the data

  // check what text was put into the form field
  let url = document.getElementById("name").value;
  if (Client.checkForURL(url)) {
    document.getElementById("results").innerHTML = "Loading . . .";
    getData("http://localhost:8081/analyze", { url: url }).then(
      (summaryData) => {
        Client.formatInfo(summaryData);
      }
    );
  }
}

const getData = async (url = "", datain = {}) => {
  // console.log("Post url", datain);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(datain),
  });

  try {
    const newData = await response.json();
    // const extractedData = newData.sentence_list;
    // console.log("extracted data: ", extractedData);
    // return extractedData;
    //document.getElementById("results").innerHTML = newData;
    // console.log("Post status : ", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };

// console.log("::: Form Submitted :::");
// fetch("http://localhost:8081/test")
//   .then((res) => res.json())
//   .then(function (res) {
//     document.getElementById("results").innerHTML = res.message;
//   });
