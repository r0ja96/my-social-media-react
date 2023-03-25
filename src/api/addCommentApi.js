export default async (data) => {
    const response = await fetch('http://localhost:4400/comment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
    });

    return await response.json();
};