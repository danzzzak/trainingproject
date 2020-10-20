const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResourse(url) { // получение данных 
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`cant fetch ${url}, status: ${res.status}`); // Отлавливает ошибку
    }

    return await res.json();
};


export {postData};
export {getResourse};