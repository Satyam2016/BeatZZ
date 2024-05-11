import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) =>  (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <Link to={`/songs/${song.track.id}/${song.track.artists[0].id}`} className="flex flex-col">
      <img className="w-20 h-20 rounded-lg" src={song.track.album.images[0].url} />
      </Link>
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.track.id}/${song.track.artists[0].id}`} className="flex flex-col">
          <p className="font-bold  text-xl text-white truncate">{song.track.name}</p>
        </Link>
        <Link to={`/artists/${song.track.artists[0].id}`} className="flex flex-col">
          <p className="text-sm truncate text-gray-300 mt-1">{song.track.artists[0].name}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      activeSong={activeSong}
      isPlaying={isPlaying}
      handlePauseClick={() => handlePauseClick(song, i)}
      handlePlayClick={() => handlePlayClick(song, i)}
    />
  </div>
)


export default SongBar;