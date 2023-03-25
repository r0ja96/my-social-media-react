export default async (postID) => {
    const response = await fetch(`http://localhost:4400/post/${postID}`, {
        method: 'GET',
        credentials: "include"
    });

    return await response.json();
};