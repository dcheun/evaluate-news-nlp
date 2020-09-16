const BASE_URL =
  "https://api.meaningcloud.com/sentiment-2.1?of=json&lang=auto&key=";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  if (!Client.checkForURL(formText)) {
    return false;
  }

  console.log("::: Form Submitted :::");
  // fetch("http://localhost:8082/meaningCloud", {
  //   method: "POST",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ url: formText }),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     document.getElementById("results").innerHTML = res;
  //   });

  getData("http://localhost:8082/key")
    .then((textapi) => {
      console.log("key=", textapi);
      const reqURL = `${BASE_URL}${textapi.application_key}&url=${formText}`;
      console.log(reqURL);
      return fetch(reqURL);
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      const results = document.getElementById("results");
      const formattedResults = [];
      formattedResults.push(
        `<table class="global-table">
        <tr>
          <th>Level</th>
          <th>Model</th>
          <th>Score tag</th>
          <th>Agreement</th>
          <th>Subjectivity</th>
          <th>Confidence</th>
          <th>Irony</th>
        </tr>
        <tr>
          <td>Global</td>
          <td>${res.model}</td>
          <td>${res.score_tag}</td>
          <td>${res.agreement}</td>
          <td>${res.subjectivity}</td>
          <td>${res.confidence}</td>
          <td>${res.irony}</td>
        </tr>
      </table>`,
        `<table class="sentence-table">
        <tr>
          <th>Level</th>
          <th>Text</th>
          <th>Score Tag</th>
          <th>Agreement</th>
          <th>Confidence</th>
        </tr>
      `
      );

      for (let sentence of res.sentence_list) {
        formattedResults.push(`<tr>
          <td>Sentence</td>
          <td>${sentence.text}</td>
          <td>${sentence.score_tag}</td>
          <td>${sentence.agreement}</td>
          <td>${sentence.confidence}</td>
        </tr>`);
        for (let segment of sentence.segment_list) {
          formattedResults.push(`<tr>
            <td>Segment</td>
            <td>${segment.text}</td>
            <td>${segment.score_tag}</td>
            <td>${segment.agreement}</td>
            <td>${segment.confidence}</td>
          </tr>`);
        }
      }

      formattedResults.push(`</table>`);

      results.innerHTML = formattedResults.join("");
      const rawResults = `
      <p>Full Raw Results:</p>
      <pre>${JSON.stringify(res, null, 2)}</pre>
      `;
      const newDiv = document.createElement("div");
      newDiv.innerHTML = rawResults;
      results.appendChild(newDiv);
    });
}

const getData = async (url = "") => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
