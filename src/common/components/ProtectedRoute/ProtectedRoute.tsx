import {useAppSelector} from "@/app/model/store/hooks.ts";
import {Navigate} from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};