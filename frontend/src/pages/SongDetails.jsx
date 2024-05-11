import {useParams, Link } from "react-router-dom";
import { useSelector, useDispatch }     from "react-redux";
import {  Error, Loader } from "../components";
import APIKit from "../spotify.js";
import { useEffect,useState } from "react";
import PlayPause from "../components/PlayPause";
import DetailsHeader from "../components/DetailsHeader.jsx";

import { setActiveSong, playPause } from "../redux/features/playerSlice";


const SongBar = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) =>  (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
       <div className="h-20 w-20">
        <Link to={`/songs/${song.track.id}/${song.track.artists[0].id}`} className="flex flex-col">
        <img className="w-20 h-20 rounded-lg" src={song.track.album.images[0].url} />
        </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center mx-3 truncate">
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
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      activeSong={activeSong}
      isPlaying={isPlaying}
      />
    </div>
  )




const SongDetails = () => {
    const { trackid, artistid } = useParams();
    const [topCharts, setTopCharts] = useState(null);
    
    useEffect(() => {
        APIKit.get(`/recommendations?seed_artists=${artistid}&seed_tracks=${trackid}&limit=20`).then((res) => {
            const data = res.data.tracks;
            let all=[];
            {data?.map((song) => {
                song = { track: song}
                all.push(song);
            })}
            console.log(all);
            setTopCharts(all);
        }
    )}, []);
    
    const dispatch = useDispatch();
        
        const { activeSong, isPlaying } = useSelector((state) => state.player);

        const handlePauseClick= (song, i) => {
            dispatch(playPause(false));
        }
        
        const handlePlayClick = (song , i) => {
            dispatch(setActiveSong({ song, topCharts, i }));
            dispatch( playPause(true));
        }
    
     return (
        <div className="flex- flex-col">
        <div className="w-full bg-gradient-to-l from transparent to-black sm:h-20 h-10" >
        <h1 className="font-bold text-3xl text-white mt-1 pt-4 pl-3">
          Related Songs:
        </h1>
        </div>
        <div className="mt-6 w-full flex flex-col"> 
            {topCharts?.map((song , i) => (      
                <SongBar
                  song={song}
                  key={song.track.id}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={() => handlePauseClick(song, i)}
                  handlePlayClick={() => handlePlayClick(song, i)}
                />
            ))}
        </div>
    </div>
     );
}

export default SongDetails;
