import { useEffect } from "react";
import { bottomBar, topBar } from "../../state/store";
import { Outlet } from "react-router";


export const Steps = () => {
    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}
const OnboardingPage = () => {
    const useBottomBar = bottomBar((state) => state);
    const useTopBar = topBar((state) => state);
    useEffect(() => {
        useBottomBar.setActive(false);
        useTopBar.setHasBackButton(true);
      }, []);

      
  return <div>  <Steps/> <Outlet/></div>;
};

export default OnboardingPage;
