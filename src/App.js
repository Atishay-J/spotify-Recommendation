import React, { useState } from "react";
import "./App.css";

//============================================
///////////////////////// MUSIC DATA
//============================================

let music = {
  Rock: {
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
  Pop: {
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
  Indian: {
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

//============================================
//============================================

let filterName = Object.keys(music);
let curFilter;

function App() {
  const [filter, setFilter] = useState("Rock");
  const [curSong, setCurSong] = useState({
    name: "Now Playing",
    artist: "artist",
    url: "",
  });

  //////////////           **FILTERING SONGS**

  let filterClick = (event) => {
    curFilter = event.target.innerHTML;
    setFilter(curFilter);
    updateValues();
  };

  ////////////             ** GETTING SONGS **

  let songs = Object.keys(music[filter]);
  let artistName = [];
  let songUrl = [];
  let allSongs = new Array();
  let songList = [];
  let isAvailable;

  function updateValues() {
    for (let i = 0; i < songs.length; i++) {
      artistName[i] = music[filter][songs[i]].artist;
      songUrl[i] = music[filter][songs[i]].url;
    }
  }
  updateValues();

  /////////////////          **UPDATING NOW PLAYING**

  let updateNowPlaying = (event) => {
    let song = event.target.innerHTML;
    let name = event.target.nextSibling.innerHTML;
    let url = event.target.nextElementSibling.nextElementSibling.href;
    console.log(url);
    setCurSong({ name: song, artist: name, url: url });
  };

  //////                  **GETTING ALL SONGS**

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
  ////////               **SEARCH (Not working)**

  let search = (event) => {
    let input = event.target.value;
    songList.map((name) => {
      if (input.toUpperCase() == name.toUpperCase()) {
        isAvailable = true;
      }
    });
  };
  let showAvailable = () => {
    let ans;
    if (isAvailable) {
      console.log("we have it");
      ans = "we have it";
      return ans;
    } else {
      console.log("sorry");
      ans = "";
      return ans;
    }
  };
  //============================================
  //////////////////// REACT APP
  //============================================
  return (
    <div className="App">
      {/************* Header *************/}

      <header className="header">
        <div className="logo_cont">
          <img src="https://bit.ly/37kGTL5" className="spotify_logo" />
          <h4 className="logo">Spotify Recommendations</h4>
        </div>

        {/* **********SEARCH BAR *************/}

        <div className="search_cont">
          <div className="search_inputs">
            <input
              className="search"
              placeholder="Search for songs"
              onChange={search}
            ></input>
            <button className="search_btn" onClick={showAvailable}>
              Search
            </button>
          </div>
          <div className="search_outputs">
            <h3 className="search_output">{showAvailable}</h3>
          </div>
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
                  <li className="trend_songs">
                    <span>#{index}</span> {song}
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
                    <svg
                      width="[width]"
                      height="[height]"
                      className="play"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
                      ></path>
                    </svg>
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
            <svg
              className="icons"
              width="[width]"
              height="[height]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
              ></path>
            </svg>
            <a href={curSong.url}>
              <svg
                className="playIcon"
                width="[width]"
                height="[height]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
                ></path>
              </svg>
            </a>
            <svg
              className="icons"
              width="[width]"
              height="[height]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"
              ></path>
            </svg>
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
