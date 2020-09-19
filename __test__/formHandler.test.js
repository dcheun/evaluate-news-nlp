import { resultsTemplate } from "../src/client/js/formHandler";

describe("Testing API calls functionality", () => {
  test("Adding API response with correct data", () => {
    let mockResponse = {
      status: {
        code: "0",
        msg: "OK",
        credits: "3",
        remaining_credits: "19951",
      },
      model: "general_en",
      score_tag: "N",
      agreement: "DISAGREEMENT",
      subjectivity: "SUBJECTIVE",
      confidence: "86",
      irony: "NONIRONIC",
      sentence_list: [],
      sentimented_entity_list: [],
      sentimented_concept_list: [],
    };
    expect(resultsTemplate(mockResponse)).toMatch(
      /<td>Global<\/td>\s*<td>general_en<\/td>\s*<td>N<\/td>\s*<td>DISAGREEMENT<\/td>\s*<td>SUBJECTIVE<\/td>\s*<td>86<\/td>\s*<td>NONIRONIC<\/td>/
    );
  });
  test("Adding API response operation denied error", () => {
    let mockResponse = {
      status: { code: "100", msg: "Operation denied", credits: "0" },
    };
    expect(resultsTemplate(mockResponse)).toBe("<p>data not available</p>");
  });
  test("Adding API response with null response", () => {
    expect(resultsTemplate(null)).toBe("<p>data not available</p>");
  });
});
