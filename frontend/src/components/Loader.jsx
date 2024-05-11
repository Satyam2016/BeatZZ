import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full justify-center items-center flex-col">
   <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h2 className="font-bold text-2xl text-white mt-2">{title}</h2>
    </div>
);

export default Loader;
