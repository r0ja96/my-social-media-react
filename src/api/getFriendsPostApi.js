export default async () => {
    const response = await fetch('http://localhost:4400/posts/friends', {
        method: 'GET',
        credentials: 'include'
    });

    return await response.json();
};