export default async () => {
    const response = await fetch('http://localhost:4400/account/last-accounts', {
        method: 'GET',
        credentials: 'include'
    });

    return await response.json();
};