import { Link } from "react-router-dom";

export default function Card({ to, children, imgSrc }) {
  return (
    <div>
      <Link to={to} className="border border-gray-opacity rounded-sm flex flex-col hover:transform hover:scale-105 transition-transform">
        <div className="overflow-hidden flex-1 ">
          <img src={imgSrc} alt="Imagen de fondo para juego" className="w-full h-full object-cover md:max-h-32" />
        </div>
        <p className="p-2 font-normal text-xs">{children}</p>
      </Link>
    </div>
  )
}
