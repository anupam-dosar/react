import styled from "styled-components";
import { useSession } from "../features/authentication/useSession";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoadingSession, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isLoadingSession && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoadingSession, isAuthenticated, navigate]);

  isLoadingSession && (
    <FullPage>
      <Spinner />
    </FullPage>
  );

  if (!isLoadingSession && isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
