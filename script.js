
// constant
  const musicLibsContainer = document.getElementById('music-libs');

// core
window.addEventListener('load', myApp)

function myApp(){
   fetchandrenderAllSection();
}

function fetchandrenderAllSection(){
    fetch('/assests/ganna.json')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
       
        const {cardbox} = res;
        if(Array.isArray(cardbox) && cardbox.length){
            cardbox.forEach(section=>{
                const {songsbox , songscards} = section;
                     renderSection(songsbox ,songscards);
            })
        }
    })
    // .catch(()=>alert('error'))
    
}

function renderSection(title,songsList){
    const songsSection = MakeSectionDom(title,songsList);
    musicLibsContainer.appendChild(songsSection);
}
function MakeSectionDom(title,songsList){
    console.log('title =>', title , 'songslist=>', songsList);
    const sectionDiv = document.createElement('div');
    sectionDiv.innerHTML = `
    <h2 class="section-heading">${title} </h2>
    <div class="song-cont"> 
    ${songsList.map(songObj=>buildSongCardDom(songObj)).join('')}
    </div>
    `
    console.log(sectionDiv.innerHTML);
    return sectionDiv;
}

function buildSongCardDom(songObj){
        return `<div class="song-card">
        <div class="card-image">
            <image src="${songObj.image_source}" alt="${songObj.song_name}"/>
            <div class="overlay">
            </div>
        </div>
        <p class="song-name">${songObj.song_name}</p>
    </div> `
}