class Album {
    constructor(dataFromAPI) {
        this.id = dataFromAPI.id;
        this.title = dataFromAPI.name;
        this.releaseDate = new Date(dataFromAPI.release_date_components.year, dataFromAPI.release_date_components.month, dataFromAPI.release_date_components.day);
        this.url = dataFromAPI.url;
        this.cover = dataFromAPI.cover_art_url;
    }
}

async function fetchData(){
    const url = 'https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=1645&per_page=20&page=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe71630704mshc70294232045912p1b8ac8jsnc1056c910103',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
 
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // tu bylo response.text() ale i tak
        displayData(result); // potem to parsujemy, wiec prosciej jest od razu jsona
    } catch (error) {
        console.error(error);
    }
}
fetchData();

function displayData(result){
    const albumsList = result.albums;
    const formattedAlbumsList = []

    albumsList.forEach(album => {
        formattedAlbumsList.push(new Album(album))
    });

    const mainDiv = document.querySelector(".main");
    
    formattedAlbumsList.forEach(album => {
        const date = `${album.releaseDate.getDate().toString().padStart(2, "0")}-${(album.releaseDate.getMonth() + 1).toString().padStart(2, "0")}-${album.releaseDate.getFullYear()}`;

        mainDiv.innerHTML += `<div id="${album.id}" class="album">
        <div class="album-info">
            ${album.title}<br />Released ${date}
        </div>
        <div class="album-cover">
            <a target="_blank" href="${album.url}">
                <img src="${album.cover}" alt="elvis" />
            </a>
        </div>
    </div>`
    });  
}