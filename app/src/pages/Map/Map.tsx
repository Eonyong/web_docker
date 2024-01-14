import React, { useEffect } from "react";
import styles from "./Map.module.scss";

const Map = () => {
  useEffect(() => {
    const NaverMap = naver.maps;
    // 현재 위치를 허용하여 위치를 받아오는 함수
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const currPos = new NaverMap.LatLng(latitude, longitude);
      const map: naver.maps.Map = new NaverMap.Map("map", {
        center: currPos,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      const marker: naver.maps.Marker | null = new NaverMap.Marker({
        position: currPos,
        map: map,
      });

      naver.maps.Event.addListener(map, "click", (e) =>
        marker.setPosition(e.coord)
      );
    });
  }, []);

  return <div id="map" className={styles.Map}></div>;
};

export default Map;
