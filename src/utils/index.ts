export function checkGenres(genres: Array<string>) {
  let comma = "";
  const sliceArray = genres.slice(-3, -1);

  const isCommaList = sliceArray.map((state, i) => {
    const isValidate = sliceArray[i + 1]
      ? (comma += `${state}, `)
      : !sliceArray[i + 1]
      ? (comma += `${state}`)
      : "";
  });

  return comma;
}

export function deleteComma(text: string) {
  if (!text) return text;
  const resultText = text.replace(",", "");
  return resultText;
}
