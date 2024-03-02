import { Link } from "react-router-dom";
import Hero from "./Hero";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 px-5 py-md-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xl text-md-3xl text-white font-bold tracking-bold">
          <Link to="/">MernBookings.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
            <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
             <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 py-2 rounded-md"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
      <Hero />
    </div>
  );
};

export default Header;
