import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIKit from "../spotify";

import { Loader, ArtistCard } from "../components";
import { useDispatch } from "react-redux";


const TopArtists = () => {
     const dispatch = useDispatch();
 
  const [ topCharts, setTopCharts ] = useState(null);


  useEffect(() => {
    APIKit.get("/search?type=artist&q=random&limit=20").then((res) => {
     const data = res.data.artists.items;
     
     setTopCharts(data);
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
                    {topCharts?.map((track) => (
                         < ArtistCard
                              key={track.id}
                             track={track}
                         />
                    ))}
               </div>
          </div>
     )
}

export default TopArtists;
