export const fetchNews = async (category: string = '', searchTerm: string = '') => {
    const apiKey = '53d69bea5fea49f99da8566135c222e0';
    const query =
      searchTerm.trim() !== ''
        ? `q=${encodeURIComponent(searchTerm)}`
        : category
        ? `category=${category}`
        : 'category=general';
  
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&${query}&apiKey=${apiKey}`
    );
    const data = await res.json();
    return data.articles || [];
  };
  