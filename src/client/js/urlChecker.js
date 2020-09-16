function checkForURL(inputText) {
  console.log("::: Running checkForURL :::", inputText);

  // Source: https://www.regextester.com/93652
  const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const match = regexp.test(inputText);

  if (!match) {
    alert("Please enter a URL.");
    return false;
  }
  return true;
}

export { checkForURL };
