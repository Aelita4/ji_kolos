async function fetchData(){
    const url = 'https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=1645&per_page=20&page=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'TWOJ_KLUCZ_API',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
 
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        displayData(result);
    } catch (error) {
        console.error(error);
    }
}
fetchData();

function displayData(result){
    albumsList = JSON.parse(result).albums;

    //You can see how the data looks like in the console:
    console.log(albumsList);
    
}