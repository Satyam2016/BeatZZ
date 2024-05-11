import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import APIKit from '../spotify'
import apiClient from '../spotify';
import { useEffect, useState } from 'react';

import {useDispatch , useSelector} from 'react-redux';



const Discover = () => {
  const dispatch = useDispatch();
  const  {  activeSong ,  isPlaying } = useSelector((state) => state.player);
  const [ topCharts, setTopCharts ] = useState(null);


  useEffect(() => {
    APIKit.get("/playlists/37i9dQZEVXbMDoHDwVN2tF").then((res) => {
      setTopCharts(res.data.tracks.items);
    })
  }, []);

  console.log(topCharts);

  if (!topCharts) {
    return <Loader title="Loading songs...." />;
  }


  const genereTitle = 'Pop';
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover</h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts?.map((song, i) => (
          <SongCard
            // key={song.track.id}
            key={song.track.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            topCharts={topCharts}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

