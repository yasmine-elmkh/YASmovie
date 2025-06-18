const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "123e5683e631c73613f7d42702156ecd",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;