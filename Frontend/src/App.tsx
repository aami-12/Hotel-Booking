import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import CommonLayout from "./Layout/CommonLayout";
import SignIn from "./Pages/Signin";
import Register from "./Pages/Register";
import NotFound from "./components/NotFound";
import AddHotel from "./Pages/AddHotel";
// import { useAppContext } from "./contexts/AppContext";
import AuthRoute from "./components/AuthRoute";
import MyHotels from "./Pages/MyHotels";
import EditHotel from "./Pages/EditHotel";
import Search from "./Pages/Search";
import Detail from "./Pages/Detail";
import Booking from "./Pages/Booking";
import Home from "./Pages/Home";
import MyBookings from "./Pages/MyBookings";

function App() {
  // const { isLoggedIn } = useAppContext();
  // const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CommonLayout>
              <Home />
            </CommonLayout>
          }
        />
        <Route
          path="sign-in"
          element={
            <CommonLayout>
              <SignIn />
            </CommonLayout>
          }
        />
        <Route
          path="register"
          element={
            <CommonLayout>
              <Register />
            </CommonLayout>
          }
        />

        <Route
          path="search"
          element={
            <CommonLayout>
              <Search />
            </CommonLayout>
          }
        />

        <Route
          path="detail/:hotelId"
          element={
            <CommonLayout>
              <Detail />
            </CommonLayout>
          }
        />

        <Route element={<AuthRoute />}>
          <Route
            path="add-hotel"
            element={
              <CommonLayout>
                <AddHotel />
              </CommonLayout>
            }
          />
          <Route
            path="my-hotels"
            element={
              <CommonLayout>
                <MyHotels />
              </CommonLayout>
            }
          />
           <Route
            path="my-bookings"
            element={
              <CommonLayout>
                <MyBookings />
              </CommonLayout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <CommonLayout>
                <EditHotel />
              </CommonLayout>
            }
          />
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <CommonLayout>
                <Booking />
              </CommonLayout>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <CommonLayout>
              <NotFound />
            </CommonLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
