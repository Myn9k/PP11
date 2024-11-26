
export async function loadUserProfile(token) {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Передача токена в заголовке
        },
      });
  
      if (!response.ok) {
        throw new Error('Не удалось загрузить профиль');
      }
  
      const data = await response.json();
      return data; // Возвращаем данные профиля
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error.message);
      return null; // Возвращаем null при ошибке
    }
  }
  