import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"

const AuthRoute = () => {
    const location = useLocation()
    const { isLoggedIn } = useAppContext()

    const content = (
       isLoggedIn
            ? <Outlet />
            : <Navigate to="/sign-in" state={{ from: location }} replace />
    )

    return content
}
export default AuthRoute