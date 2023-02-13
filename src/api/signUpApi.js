export default async (data) => {
    const response = await fetch('http://localhost:4400/account', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    return await response.json();
};