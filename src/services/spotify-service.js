import { getToken } from "./auth-service";


export const searchSpotify = async (searchInput, songLimit, type) => {
    const access_token = await getToken();
    console.log(access_token)
    const results = await fetch("https://api.spotify.com/v1/search?q=" + searchInput + `&type=${type}&limit=${songLimit}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${access_token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            switch (type) {
                case "artist":
                    return data.artists;
                case "album":
                    return data.albums;
                case "track":
                    return data.tracks;
                default:
                    break;
            }
        });
    return results.items;
};

export const getAlbum = async (albumId) => {
    const access_token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    return response;
};

/*export const likeAlbum = async (album) => {
    const response = await api.post(`${ALBUM_API}/${album.albumId}/likes`, album);
    return response.data;
};*/