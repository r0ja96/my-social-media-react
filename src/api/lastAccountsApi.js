export default async (token) => {
    const response = await fetch('http://localhost:4400/account/last-accounts', {
        headers: {
            'authorization': `Bearer ${token}`
        },
        method: 'GET'
    });

    return await response.json();
};