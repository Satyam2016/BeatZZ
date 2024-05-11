import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import APIKit from "../spotify.js";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import 'swiper/css';
import 'swiper/css/free-mode';


const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistImageUrl }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <Link to={`/songs/${song.track.id}/${song.track.artists[0].id}`} className="flex flex-col">
      <img className="w-12 h-12 rounded-lg" src={song.track.album.images[0].url} />
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
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      activeSong={activeSong}
      isPlaying={isPlaying}
    />
  </div>
)


const TopPlay = () => {
  const [topCharts, setTopCharts] = useState(null);

  useEffect(() => {
    APIKit.get("/playlists/37i9dQZEVXbMDoHDwVN2tF").then((res) => {
      setTopCharts(res.data.tracks.items);
    });
  }, []);

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  })

  const topPlays = topCharts?.slice(0, 5);

  const handlePauseClick = (song, i) => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, topCharts, i }));
    dispatch(playPause(true));
  }

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full lex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-2xl text-white">Top Charts</h2>
          <Link to="/top-charts" className="text-sm text-gray-300">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
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
      <div className="w-full lex flex-co mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-2xl text-white">Top Artist</h2>
          <Link to="/top-artists" className="text-sm text-gray-300">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.track.id}
              style={{ width: '15%', height: '10%' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song.track.artists[0].id}`}>
                <img src={song.track.album.images[0].url} alt="artist" className=" rounded-full object-cover w-21 h-21 aspect-square" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay;
