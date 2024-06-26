import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, topCharts, i }) => {
  
  // console.log(song);

  const dispatch = useDispatch();

  const handlePauseClick= () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, topCharts, i }));
    dispatch( playPause(true));
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={"absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex" + (activeSong === song.title ? " flex bg-black bg-opacity-70" : " hidden")}>
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        </div>
        <img alt="song_img" src={song.track.album.images[0].url}  />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.track.id}`} >
            {song.track.name}
          </Link >
        </p>
        <p className="text-sm truncate text-gray-300 mt-1" >
          <Link to={song.track.artists ? `/artists/${song.track.artists[0].id}` : `/top-artists`} >
            {song.track.artists[0].name}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
