/**
 * Verifica se o usuário está autenticado, verificando se possue o item 'token' no sessionStorage do navegador
 */
export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('token');
    return accessToken;
};
