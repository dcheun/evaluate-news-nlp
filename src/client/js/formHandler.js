function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  if (!Client.checkForURL(formText)) {
    return false;
  }

  const data = { url: formText };

  postData("http://localhost:8082/meaningCloud", data).then((res) => {
    renderResults(res);
  });
}

function renderResults(results) {
  document.getElementById("results").innerHTML = `${resultsTemplate(results)}`;
}

function resultsTemplate(data) {
  if (data && Object.keys(data).length > 3) {
    const {
      model,
      score_tag,
      agreement,
      subjectivity,
      confidence,
      irony,
    } = data;
    const htmlTemplate = [];
    htmlTemplate.push(
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
          <td>${model}</td>
          <td>${score_tag}</td>
          <td>${agreement}</td>
          <td>${subjectivity}</td>
          <td>${confidence}</td>
          <td>${irony}</td>
        </tr>
      </table>`
    );

    if (data.sentence_list.length > 0) {
      htmlTemplate.push(`
        <table class="sentence-table">
          <tr>
            <th>Level</th>
            <th>Text</th>
            <th>Score Tag</th>
            <th>Agreement</th>
            <th>Confidence</th>
          </tr>
      `);

      for (let sentence of data.sentence_list) {
        htmlTemplate.push(`<tr>
            <td>Sentence</td>
            <td>${sentence.text}</td>
            <td>${sentence.score_tag}</td>
            <td>${sentence.agreement}</td>
            <td>${sentence.confidence}</td>
          </tr>`);
        for (let segment of sentence.segment_list) {
          htmlTemplate.push(`<tr>
              <td>Segment</td>
              <td>${segment.text}</td>
              <td>${segment.score_tag}</td>
              <td>${segment.agreement}</td>
              <td>${segment.confidence}</td>
            </tr>`);
        }
      }

      htmlTemplate.push(`</table>`);
    }

    const rawResults = `
      <p>Full Raw Results:</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    htmlTemplate.push(rawResults);
    return htmlTemplate.join("");
  }

  return `<p>data not available</p>`;
}

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit, renderResults, resultsTemplate };
