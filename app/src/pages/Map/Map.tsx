import React, { useEffect } from "react";
import styles from "./Map.module.scss";

const Map = () => {
  useEffect(() => {
    const mapDiv = document.getElementById("map");
    if (mapDiv) {
      const map = new window.naver.maps.Map(mapDiv);
    }
  }, []);

  return <div id="map" className={styles.Map}></div>;
};

export default Map;
