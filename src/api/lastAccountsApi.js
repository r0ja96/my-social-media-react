export default async (accessToken) => {
    const response = await fetch('http://localhost:4400/account/last-accounts', {
        headers: {
            'authorization': `Bearer ${accessToken}`
        },
        method: 'GET'
    });

    return await response.json();
};