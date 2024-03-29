import { IPreviewAnime } from "../types";

const isForbiddenWords = [
  "Хочешь татуировку с любимым аниме персонажем, Rare Dare сделает ее для тебя.",
];

export function checkGenres(genres: Array<string>) {
  if (!genres) return;
  let comma = "";
  const sliceArray = genres.slice(-3, -1);

  sliceArray.map((state, i) => {
    const isValidate = sliceArray[i + 1]
      ? (comma += `${state}, `)
      : !sliceArray[i + 1]
      ? (comma += `${state}`)
      : "";
    return isValidate;
  });

  return comma;
}

export function deleteForbiddenWords(text: string) {
  if (!text) return "";
  let resultText = text;
  isForbiddenWords.forEach((forbiddenWord) => {
    const regex = new RegExp(forbiddenWord, "gi");
    resultText = resultText.replace(regex, "");
  });
  return resultText;
}

export function deleteComma(text: string) {
  if (!text) return text;
  const resultText = text.replace(",", "");
  return resultText;
}

export function checkFullscreenSupport() {
  const isFullscreenSupported = document.fullscreenEnabled;

  if (isFullscreenSupported) {
    return true;
  } else {
    return false;
  }
}

export function handleToFullScreen(ref: React.RefObject<HTMLDivElement>) {
  if (!ref || !ref.current) return;
  const validate = document.fullscreenElement ? true : false;
  const container = ref.current;

  if (
    !validate &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    container.requestFullscreen();
    screen.orientation.lock("landscape");
    return;
  }

  if (!validate) {
    container.requestFullscreen();
    return;
  }
  if (validate) {
    document.exitFullscreen();
  }
}

export function isPortableDevice() {
  const validate =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return validate;
}

export function sortWords(array: Array<IPreviewAnime>, word: string) {
  if (!array) return [];
  const symbols = /[, :.]/g;
  const replacedText = word.replace(symbols, "").trim().toLowerCase();
  const newArray = array.map((state) => state);
  const sortArray = newArray.sort((a) => {
    if (a.name[0].toLowerCase() === replacedText[0]) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortArray;
}

export function replaceTextForSymbols(text: string) {
  const symbols = /[, .:$%^&*)#@!;'"]/g;
  const replacedText = text.replace(symbols, "");
  return replacedText;
}

export function updatedReplaceForSymbols(text: string) {
  const symbolsAndNumbers = /[ ,/=!$#@^*)(%*$#_+)]/g;
  const replacedText = text.replace(symbolsAndNumbers, "-");
  return replacedText;
}
