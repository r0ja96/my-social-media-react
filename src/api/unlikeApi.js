export default async (data) => {
    const response = await fetch('http://localhost:4400/like', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        credentials: "include",
        body: JSON.stringify(data)
    });

    return await response.json();
};