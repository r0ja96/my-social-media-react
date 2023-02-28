export default async () => {

    const response = await fetch('http://localhost:4400/account/logout', {
        method: 'DELETE',
        credentials: 'include',
    });

    return await response.json();
};