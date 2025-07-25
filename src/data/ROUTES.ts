const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  USERS: `${apiUrl}/users`,
  ARTICLES: `${apiUrl}/articles`,
  LIKES: `${apiUrl}/likes`,
};

const appRoutes = {
  HOME: `${appUrl}`,
  ABOUT: `${appUrl}/a-propos`,
  BLOG: `${appUrl}/blog`,
  PROFIL: `${appUrl}/profil`,
  ADMIN: `${appUrl}/admin`,
};

export { apiRoutes, appRoutes };
