const env = {
  appState: import.meta.env.VITE_APP_STATE || 'demo',
  baseUrl:
    import.meta.env.VITE_MDG_PUBLIC_API_URL || 'http://127.0.0.1:2999/api/v1',
};

if (env.appState === 'dev') {
  env.baseUrl = 'http://127.0.0.1:3000/api/v1';
}
console.log(env);

export default env;
