export const loadUserProfile = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return { username: data.username, email: data.email };
    }
    return null;
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error);
    return null;
  }
};
