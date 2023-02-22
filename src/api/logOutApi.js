export default async (accessToken) => {

    const response = await fetch('http://localhost:4400/account/logout', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`
        },
        method: 'DELETE',
        body: JSON.stringify({ token: document.cookie.split('token=')[1] })
    });

    return await response.json();
};