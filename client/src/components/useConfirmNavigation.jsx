import { useNavigate, useLocation } from "react-router-dom";

const useConfirmNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const confirmNavigate = (to, options) => {
    // ✅ Check if current page is any /scoring/* route
    if (location.pathname.startsWith("/scoring")) {
      const ok = window.confirm("Are you sure you want to quit the live Scoring?");
      if (ok) {
        navigate(to, options);
      }
    } else {
      navigate(to, options);
    }
  };

  return confirmNavigate;
};

export default useConfirmNavigation;
