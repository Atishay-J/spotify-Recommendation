import React, { useState } from "react";
import "./App.css";
import play from "./play-circle-solid.svg";
import forward from "./forward-solid.svg";
import backward from "./backward-solid.svg";

//////////////////////////////// MUSIC DATA

let music = {
  rock: {
    "Purple Haze": {
      artist: "Jimi Hendrix",
      url: "https://spoti.fi/386cpM5",
    },
    "Under Pressure": {
      artist: "Queen, David Bowie",
      url: "https://spoti.fi/383WnCa",
    },
    "Comfortably Numb": {
      artist: "Pink Floyd",
      url: "https://spoti.fi/3a6AZyU",
    },
    "Start Me Up": {
      artist: "The Rolling Stones",
      url: "https://spoti.fi/348ShYc",
    },
    "Whole Lotta Love": {
      artist: "Led Zeppelin",
      url: "https://spoti.fi/3nmT1kc",
    },
  },
  pop: {
    Thriller: {
      artist: "Michael Jackson",
      url: "https://spoti.fi/3gL9NqB",
    },
    "Like a Prayer": {
      artist: "Madonna",
      url: "https://spoti.fi/3oRoKdK",
    },
    "When Doves Cry": {
      artist: "Prince",
      url: "https://spoti.fi/3gMP85F",
    },
    Sorry: {
      artist: "Justin Bieber",
      url: "https://spoti.fi/3qUXkFx",
    },
  },
  "Hip Hop": {
    "Lose Yourself": {
      artist: "Eminem",
      url: "https://spoti.fi/2IPP5JO",
    },
    "Still DRE": {
      artist: "Dr Dre",
      url: "https://spoti.fi/3qXavGb",
    },
    "Gin and Juice": {
      artist: "Snoop Dogg",
      url: "https://spoti.fi/3r5iHEm",
    },
    "Real Slim Shady": {
      artist: "Eminem",
      url: "https://spoti.fi/3a9KEos",
    },
  },
  indian: {
    "Aao Balma": {
      artist: "A.R Rahman , Ghulam Mustafa Khan",
      url: "https://spoti.fi/3mgSpLH",
    },
    "Dekha hai aise bhi": {
      artist: "Lucky Ali",
      url: "https://spoti.fi/37eElhw",
    },
    "Oh Sanam": {
      artist: "Lucky Ali",
      url: "https://spoti.fi/2INhhgp",
    },
    Hairat: {
      artist: "Lucky Ali",
      url: "https://spoti.fi/2We7Sle",
    },
  },
};

let filterName = Object.keys(music);
let curFilter;

function App() {
  const [filter, setFilter] = useState("rock");
  const [curSong, setCurSong] = useState({
    name: "Now Playing",
    artist: "artist",
    url: "",
  });

  ////////////////////////////// FILTERING SONGS

  let filterClick = (event) => {
    curFilter = event.target.innerHTML;
    setFilter(curFilter);
    updateValues();
  };

  /////////////////////////////////// GETTING SONGS

  let songs = Object.keys(music[filter]);
  let artistName = [];
  let songUrl = [];
  let allSongs = new Array();
  let songList = [];

  function updateValues() {
    for (let i = 0; i < songs.length; i++) {
      artistName[i] = music[filter][songs[i]].artist;
      songUrl[i] = music[filter][songs[i]].url;
    }
  }
  updateValues();

  ////////////////////////////////////// UPDATING NOW PLAYING

  let updateNowPlaying = (event) => {
    let song = event.target.innerHTML;
    let name = event.target.nextSibling.innerHTML;
    let url = event.target.nextElementSibling.nextElementSibling.href;
    console.log(url);
    setCurSong({ name: song, artist: name, url: url });
  };

  ///////////////////////////////// GETTING ALL SONGS
  function getAllSongs() {
    let allGenres = Object.keys(music);
    for (let i = 0; i < allGenres.length; i++) {
      allSongs[i] = Object.keys(music[allGenres[i]]);
    }
  }
  getAllSongs();
  for (let j = 0; j < allSongs.length; j++) {
    songList = songList.concat(allSongs[j]);
  }
  console.log(songList);

  ///////////////////////////////////// REACT APP

  return (
    <div className="App">
      {/************* Header *************/}

      <header className="header">
        <div className="logo_cont">
          <h4 className="logo">Spotify Recommendation</h4>
        </div>
        <div className="search_cont">
          <input className="search"></input>
          <button className="search_btn">Search</button>
        </div>
      </header>

      <div className="main_cont">
        {/*********  SIDE BAR ************/}
        <div className="side_bar">
          <div className="trend_header">
            <h3 className="trending">Top Charts</h3>
          </div>
          <div className="trend_list">
            <ul>
              {songList.map((song, index) => {
                return (
                  <li>
                    #{index} {song}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/**************SONG LIST ********** */}

        <div className="song_list">
          <h3 className="heading">Filter by Genre</h3>

          {/* ***********FILTERS********* */}

          <div className="filter_cont">
            {filterName.map((filter) => {
              return (
                <button className="filters" onClick={filterClick}>
                  {filter}
                </button>
              );
            })}
          </div>

          {/* ********SONGS CONTAINER******* */}

          <div className="songs_cont">
            {songs.map((e, index) => {
              return (
                <div className="song_card">
                  <h5 className="songName" onClick={updateNowPlaying}>
                    {e}
                  </h5>
                  <h6 className="artistName">{artistName[index]}</h6>;
                  <a href={songUrl[index]}>
                    <img src={play} className="play" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ****************FOOTER*********** */}

      <footer>
        {/* ***********NOW PLAYING******** */}
        <div className="nowPlaying_cont">
          <h5 className="songName">{curSong.name}</h5>
          <h6 className="artistName">{curSong.artist}</h6>
          <div className="nowPlayingIcon_cont">
            <img className="icons" src={backward} />
            <a href={curSong.url}>
              <img className="icons" src={play} />
            </a>
            <img className="icons" src={forward} />
          </div>
        </div>

        {/* ************CREDITS********** */}

        <div className="foot">
          <h5 className="credits">Made with ♥ by Atishay</h5>
          <h6 className="copy">&copy; 2020</h6>
        </div>
      </footer>
    </div>
  );
}

export default App;
