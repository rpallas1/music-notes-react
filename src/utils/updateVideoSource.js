export function updateVideoSource(source, format) {
  const screenWidth = window.innerWidth;
  const pixelRatio = window.devicePixelRatio;
  const path = "/videos/";
  const largeImg = `${path}${source}-900.${format}`;
  const mediumImg = `${path}${source}-600.${format}`;
  const smallImg = `${path}${source}-300.${format}`;

  if (screenWidth >= 1200) {
    return largeImg;
  } else if (screenWidth >= 880) {
    return pixelRatio > 1 ? largeImg : mediumImg;
  } else {
    return pixelRatio > 1 ? mediumImg : smallImg;
  }
}
