import {Link } from 'react-router-dom';

const DetailsHeader = ({arrtistId, artistData, song}) => (
  <div className="relative w-full flex flex-col" >
     
      <div className="absolute inset-0 flex items-center">
      <h2   className=" w-full w-25 h-25 rounded-lg" >
        Related Songs
      </h2>
      </div>
  </div>
);

export default DetailsHeader;
