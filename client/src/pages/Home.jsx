import { Link } from "react-router";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center flex-1 ml-[17%]"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/025/871/650/non_2x/background-with-sport-equipment-vector.jpg')",
      }}
    >
      <div className="relative z-10 max-w-3xl px-6 text-black">
        <h1 className="text-5xl font-extrabold sm:text-7xl">
          Share & Celebrate
          <span className="text-blue-400"> Iconic Athlete Moments</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl">
          Connect with sports enthusiasts, post legendary moments, and engage
          with the greatest highlights in sports history.
        </p>

        <div className="mt-8 flex flex-row items-center justify-center gap-3">
          <Link
            to="/catalog"
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-500 transition"
          >
            Explore Posts →
          </Link>
        </div>
      </div>
    </div>
  );
}
