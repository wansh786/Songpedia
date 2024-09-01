import React, { useEffect, useState } from 'react';
import './App.css';

const clientId = 'eb82fd01806b4731b41cfccfb8510154';
const clientSecret = '9db13c12888940d19de31b80141e3651';

function App() {
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [tracks, setTracks] = useState([]);
  const [trackDetail, setTrackDetail] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      setToken(data.access_token);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchGenres = async () => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        setGenres(data.categories.items);
      };

      fetchGenres();
    }
  }, [token]);

  const handleGenreChange = async (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);

    if (genreId) {
      const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=10`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      const data = await result.json();
      console.log('API DATA:',data)
      setPlaylists(data.playlists.items);
    }
  };

  const handlePlaylistChange = async (event) => {
    const playlistId = event.target.value;
    setSelectedPlaylist(playlistId);

    if (playlistId) {
      const result = await fetch(`${playlistId}?limit=10`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      const data = await result.json();
      setTracks(data.items);
    }
  };

  const handleTrackClick = async (trackEndpoint) => {
    const result = await fetch(trackEndpoint, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const track = await result.json();
    console.log('track:',track)
    setTrackDetail(track);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Songpedia</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="container">
        <div className="sidebar">
          <div className="genre-selector">
            <h2>Genre</h2>
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">Select a Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="playlist-selector">
            <h2>Playlists</h2>
            <select value={selectedPlaylist} onChange={handlePlaylistChange}>
              <option value="">Select a Playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.tracks.href}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="main-content">
          <div className="track-list-container">
            <h2>Tracks</h2>
            <ul className="track-list">
              {tracks.map((track) => (
                <li
                  key={track.href}
                  onClick={() => handleTrackClick(track.track.href)}
                >
                  {track.track.name}
                </li>
              ))}
            </ul>
          </div>
          {trackDetail && (
            <div className="track-detail">
              <img
                src={trackDetail.album.images[2].url}
                alt={trackDetail.name}
              />
              <div>
                <h3>{trackDetail.name}</h3>
                <p>By {trackDetail.artists[0].name}</p>
                <p>Release date: {trackDetail.album.release_date}</p>
                <p>Duration: {(((trackDetail.duration_ms) / 1000) / 60).toFixed(2)} min</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
