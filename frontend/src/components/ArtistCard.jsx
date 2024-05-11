import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ArtistCard = ({ track }) => {  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    onClick={() => navigate(`/artists/${track.id}`)}
    >
      <img  alt="artist"  src={track.images[0].url} 
      className="w-fullh-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg truncate text-white ">
      {track.name}
      </p>
    </div>
  );
}

export default ArtistCard;
