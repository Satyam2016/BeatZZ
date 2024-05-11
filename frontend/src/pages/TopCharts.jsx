import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIKit from "../spotify";
import { SongCard } from "../components";
import { Loader } from "../components";
import { useDispatch } from "react-redux";


const TopCharts = () => {
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


     if (!topCharts) {
          return <Loader title="Loading songs...." />;
     }

     return (
          <div className="flex flex-col">
               <h2 className="text-white text-3xl font-bold mt-4 text-left">
                    Discover Top Charts
               </h2>
               <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
                    {topCharts?.map((song, i) => (
                         <SongCard
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
     )
}

export default TopCharts;
