export default async () => {
    const response = await fetch('http://localhost:4400/token', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ token: `${document.cookie.split('token=')[1]}` })
    });

    return await response.json();
};