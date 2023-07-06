
// constant
  const musicLibsContainer = document.getElementById('music-libs');
  const audioPlayer = document.getElementById('audio-player');
  const pausedBtn = document.getElementById('paused');
  const playingBtn = document.getElementById('playing');
  const songCurrentTime = document.getElementById('songTimeStart');
  const songTotalTime = document.getElementById('songTotalTime');


  var currentSongObj = {};
  var defaultImage="assests/images/defaultImage.gif";

// core
window.addEventListener('load', myApp)

function myApp(){
   fetchandrenderAllSection();
}

function fetchandrenderAllSection(){
    fetch('/assests/ganna.json')
    .then(res=>res.json())
    .then(res=>{
       // console.log(res);
       
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
    //console.log(sectionDiv.innerHTML);
    return sectionDiv;
}

function buildSongCardDom(songObj){
        return `<div class="song-card" onclick="playSong(this)" data-songobj='${JSON.stringify(songObj)}'>
        <div class="card-image">
            <image src="${songObj.image_source}" alt="${songObj.song_name}"/>
            <div class="overlay">
            </div>
        </div>
        <p class="song-name">${songObj.song_name}</p>
    </div> `
}


// Music Player
        function playSong(songCardEl){
                const songObj = JSON.parse(songCardEl.dataset.songobj);
                // console.log(songObj);
                setAndPlayCurrentSong(songObj);    
              
                document.getElementById('playing_cont').classList.remove('hidden');
                
        }

        function setAndPlayCurrentSong(songObj){
        currentSongObj = songObj;
        audioPlayer.pause();
        audioPlayer.src = songObj.quality.low;
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        updatePlayerUi(songObj);
        }

    function updatePlayerUi(songObj){
        const songImg =  document.getElementById('song-img'); 
        const songName = document.getElementById('song-name'); 
        const songCurrentTime = document.getElementById('songTimeStart');
      

        songImg.src = songObj.image_source;
        songName.innerHTML = songObj.song_name;

       //songCurrentTime.innerHTML = audioPlayer.currentTime;
       
   
        pausedBtn.style.display = 'none';
        playingBtn.style.display = 'block';
      
       }

         function togglePlayer(){
            if(audioPlayer.paused) {
                audioPlayer.play();
            }  
            else {
                audioPlayer.pause();
              
            } 
              pausedBtn.style.display = audioPlayer.paused ? 'block' : 'none';
              playingBtn.style.display = audioPlayer.paused ? 'none' : 'block';
        }
   
    // Audio Player
       audioPlayer.addEventListener('play' ,function(){
        if(!audioPlayer || audioPlayer.paused) return;
       
        songTimeStart.innerHTML= getTimeString(audioPlayer.currentTime);
        songTotalTime.innerHTML = getTimeString(audioPlayer.duration);   
        
        setInterval(function(){
            if(!audioPlayer || audioPlayer.paused) return;
       
            songTimeStart.innerHTML= getTimeString(audioPlayer.currentTime);
            songTotalTime.innerHTML = getTimeString(audioPlayer.duration);   
            
             })
    })

    function getTimeString(time){
        return isNaN(audioPlayer.duration)?"0:00":Math.floor(time/60)+":"+parseInt((((time/60)%1)*60).toPrecision(2));
   }
 

    //    Volume
    var range = document.querySelector(".range");
    range.addEventListener("change", function (e) {
       audioPlayer.volume = e.target.value;
    });

    
   

