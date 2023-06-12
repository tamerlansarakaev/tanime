export function checkGenres(genres: Array<string>) {
  if (!genres) return;
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
  if (!validate) {
    container.requestFullscreen();
  }
  if (validate) {
    document.exitFullscreen();
  }
}

