import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function InitRequire({ children }) {
    const { isInitialized } = useAuth();

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    return children;
}

export default InitRequire;
