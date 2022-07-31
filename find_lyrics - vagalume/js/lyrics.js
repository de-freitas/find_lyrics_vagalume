function findLyrics(artist, song) {
    return fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}`);
}

const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

function doSubmit() {
    const lyrics_el = document.querySelector("#lyrics");
    const lyrics_tr = document.querySelector("#lyrics_translated")
    const artist = document.querySelector("#artist");
    const song = document.querySelector("#song");

    lyrics_el.innerHTML = `<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>`;

    //com .then()
    findLyrics(artist.value, song.value)
        .then(response => response.json())
        .then(data => {
            if (data.type == 'exact' || data.type == 'aprox') {
                lyrics_el.innerHTML = `[${data.mus[0].name}] <br><br> ${data.mus[0].text}`;
                if (data.mus[0].lang != 1) {
                    lyrics_tr.innerHTML = data.mus[0].translate[0].text;
                } else {
                    lyrics_tr.innerHTML = '';
                }
            } else {
                lyrics_el.innerHTML = data.type;
            }
        })
        .catch(err => {
            lyrics_el.innerHTML = `Oops! ${err}`;
        })
        console.log(lyrics_el);
}