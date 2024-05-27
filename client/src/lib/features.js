export const fileFormat = (url) => {
  const exte = url?.split(".")?.pop();
  if (exte == "mp4" || exte == "webm" || exte == "ogg") {
    return "video";
  } else if (exte == "pdf") {
    return "pdf";
  } else if (
    exte == "png" ||
    exte == "jpg" ||
    exte == "jpeg" ||
    exte == "gif" ||
    exte == "webp"
  ) {
    return "image";
  } else if (exte == "mp3" || exte == "wav") {
    return "audio";
  } else {
    return "unknown";
  }
};

export const transformUrl = (url) => {
  return url;
};
