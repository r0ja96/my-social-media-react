export default async () => {
    const response = await fetch('http://localhost:4400/friends', {
        method: 'GET',
        credentials: 'include'
    });

    return await response.json();
};