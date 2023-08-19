import React from "react";

export const useMobileTabletDetection = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      const isMobileOrTabletDevice = innerWidth >= 800 && innerHeight >= 800;
      setIsMobileOrTablet(isMobileOrTabletDevice);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileOrTablet;
};
