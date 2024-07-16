const BuildHref = (urls: string[], currentIndex: number): string => {
  let str = '';
  for (let i = 0; i < currentIndex + 1; i++) {
    if (!urls[i].length) continue; // Skip the first empty item -> ''
    str = str + `/${urls[i]}`;
  }
  return str;
}

export default BuildHref