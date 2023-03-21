export default async (data) => {
    const response = await fetch('http://localhost:4400/post', {
        method: 'POST',
        credentials: "include",
        body: data
    });

    return await response.json();
};