const encodeUtf8 = (string) => {
  // função do Lucas Rodrigues Turma 08
  const stringUTF = unescape(encodeURIComponent(string));
  return stringUTF.replace(/&quot;|&#039;/gi, '\'');
};

export default encodeUtf8;
