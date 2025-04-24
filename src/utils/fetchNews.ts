export const fetchNews = async (category: string = '', search: string = '') => {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
  
    const res = await fetch(`/api/news?${queryParams.toString()}`);
    const data = await res.json();
    return data;
  };
  