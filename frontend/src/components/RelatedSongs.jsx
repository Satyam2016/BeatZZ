import SongBar from "./SongBar";

const RelatedSongs = ({
  topCharts, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId
}) => (
  <div className="flex- flex-col">
      <h1 className="font-bold text-3xl text-white">
        Related Songs:
      </h1>
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

export default RelatedSongs;
