function getData(searchQuery = "", currentPage = 1) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "22709546-f5c1ca5c0881bb53c54fd0f13";
  const url = `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Нет изображений по вашему запросу ${searchQuery}`)
    );
  });
}

export const APIpixabay = { getData };
