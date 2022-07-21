import axios from "axios";
import { useEffect, useState } from "react";
import { usePosition } from "use-position";
import HavaDurumu from "./components/HavaDurumu";

const App = () => {
  const [hDurumu, setHDurumu] = useState();
  const { latitude, longitude } = usePosition();

  const getHaDurumuData = async (lat, lon) => {
    const key = process.env.WEATHERMAP_API_KEY;
    const lang = navigator.language.split("-")[0];

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`
      );
      setHDurumu(data);
    } catch {
      alert("Veri alinirken hata olustu.");
    }
  };

  useEffect(() => {
    latitude && longitude && getHaDurumuData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Hava Durumu</h2>
      <HavaDurumu weather={hDurumu} />
    </div>
  );
};

export default App;
