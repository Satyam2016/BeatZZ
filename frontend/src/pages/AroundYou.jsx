import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIKit from "../spotify";
import { SongCard } from "../components";
import { Loader } from "../components";


const AroundYou = () => {
     const [topCharts, setTopCharts] = useState(null);
     const { activeSong, isPlaying } = useSelector((state) => state.player);

     useEffect(() => {
          APIKit.get("/search?q=random&type=track&limit=50").then((res) => {
               const data = res.data.tracks.items;
               console.log(data);
               let all = [];
               {
                    data?.map((song) => {
                         song = { track: song }
                         all.push(song);
                    })
               }
               setTopCharts(all);
               console.log(res.data);

          })
     }, []);

     console.log(topCharts);

     if (!topCharts) {
          return <Loader title="Loading songs...." />;
     }

     return (
          <div className="flex flex-col">
               <h2 className="text-white text-3xl font-bold mt-4 text-left">
                    Around You
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

export default AroundYou;
