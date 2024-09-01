# Songpedia

This is a React-based application that interacts with the Spotify API to allow users to explore music genres, playlists, and tracks. The app also features a dark mode toggle for user convenience.

# Screenshots
![alt text](<Screenshot 2024-09-01 202000.png>) 
![alt text](<Screenshot 2024-09-01 201935.png>)
## Features

- **Genre Selection**: Users can select a music genre from a dropdown list.
- **Playlist Display**: Once a genre is selected, the app fetches and displays a list of playlists associated with that genre.
- **Track Listing**: Users can view tracks in a selected playlist and click on them to view detailed information.
- **Track Details**: Displays album art, artist name, release date, and duration of the selected track.
- **Dark Mode**: Users can toggle between light and dark modes for a better user experience.

## Technologies Used

- **React**: For building the user interface.
- **Spotify API**: For fetching music data including genres, playlists, and tracks.
- **CSS**: For styling the application, including dark mode functionality.

## Setup and Installation
In the App.js file, replace the clientId and clientSecret with your own Spotify API credentials.

const clientId = 'your_spotify_client_id';
const clientSecret = 'your_spotify_client_secret';


### Prerequisites

- Node.js installed on your local machine.
- A Spotify developer account to get `clientId` and `clientSecret`.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/music-app.git
   cd music-app
