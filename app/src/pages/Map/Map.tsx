import React, { useEffect } from "react";
import styles from "./Map.module.scss";

const Map = () => {
  useEffect(() => {
    const NaverMap = naver.maps;
    let position: naver.maps.LatLng = new NaverMap.LatLng(
      37.3595704,
      127.105399
    );

    const map: naver.maps.Map = new NaverMap.Map("map", {
      center: position,
    });

    const marker: naver.maps.Marker = new NaverMap.Marker({
      position: position,
      map: map,
    });

    naver.maps.Event.addListener(map, "click", (e) =>
      marker.setPosition(e.coord)
    );
  }, []);

  return <div id="map" className={styles.Map}></div>;
};

export default Map;
