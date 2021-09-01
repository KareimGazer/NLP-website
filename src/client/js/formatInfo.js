function formatInfo(inputText) {
  console.log("::: Running formatInfo :::", inputText);

  const regex = /[A-Za-z]+$/g;

  // getting data arrays
  const highlights = inputText.highlights.map((highlight) => highlight.text);
  const concepts = inputText.concepts.map((concept) => {
    const paragraph = concept.type;
    const found =
      paragraph.match(regex).length == 1 ? paragraph.match(regex) : "";
    return concept.form + ` (${found})`;
  });
  const entities = inputText.entities.map((entity) => {
    const paragraph = entity.type;
    const found =
      paragraph.match(regex).length == 1 ? paragraph.match(regex) : "";
    return entity.form + ` (${found})`;
  });

  // testing in console
  console.log("highlights", highlights);
  console.log("concepts", concepts);
  console.log("entities", entities);

  const highlightsDIV = formatDiv(
    highlights,
    "***************** Most Important HighLights: *****************"
  );
  const conceptsDIV = formatDiv(
    concepts,
    "***************** Concepts Found In The Page: *****************"
  );
  const entitiesDIV = formatDiv(
    entities,
    "***************** Entities Found In The Page: *****************"
  );

  document.getElementById("results").innerHTML = "";
  document.getElementById("results").appendChild(highlightsDIV);
  document.getElementById("results").appendChild(conceptsDIV);
  document.getElementById("results").appendChild(entitiesDIV);
}

function formatElement(inputText) {
  const text = document.createTextNode(inputText);
  const paragraph = document.createElement("p");
  const br = document.createElement("br");
  const item = document.createElement("li");

  paragraph.appendChild(text);
  item.appendChild(br);
  item.appendChild(paragraph);
  item.appendChild(br);
  return item;
}

function formatDiv(textArr, header) {
  const DIV = document.createElement("div");
  const headLine = document.createElement("h1");
  headLine.innerText = header;
  const List = document.createElement("ul");
  textArr.map((text) => {
    const item = formatElement(text);
    List.appendChild(item);
  });
  DIV.appendChild(headLine);
  DIV.appendChild(List);
  return DIV;
}

export { formatInfo };
