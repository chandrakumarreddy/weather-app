import React from "react";
import Clock from "./Clock";
import DateTime from "./DateTime";
import getWeather from "../api/weather";
import ForeCast from "./ForeCast";

export default function Location() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    if (navigator.geolocation) {
      getPosition()
        .then(async ({ coords }) => {
          updateWeather(`lat=${coords.latitude}&lon=${coords.longitude}`);
        })
        .catch(async () => {
          alert(
            "You have disabled location service. Allow This APP to access your location. Your current location will be used for calculating Real time weather."
          );
          updateWeather("q=Hyderabad");
        });
    }
  }, []);
  const updateWeather = async (param) => {
    try {
      const res = await getWeather(param);
      if (res.status === 200) {
        const json = await res.json();
        setData(json);
        setError(null);
      } else {
        setError("invalid entry");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  if (!data)
    return (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: 30,
          boxSizing: "border-box",
        }}
      >
        <img
          src={"/WeatherIcons.gif"}
          alt="weather"
          style={{ width: "50%", WebkitUserDrag: "none" }}
        />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location wil be displayed on the App <br></br> & used for
          calculating Real time weather.
        </h3>
      </div>
    );
  return (
    <div className="location-container">
      <div className="location">
        <div className="location-header">
          <h1>{data.name}</h1>
          <h1>{data?.sys?.country}</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Clock />
            <DateTime />
          </div>
          <div className="location-temperature">
            <h1>{data?.main?.temp?.toFixed(1)}°</h1>
            <h2>c</h2>
          </div>
        </div>
      </div>
      <ForeCast data={data} updateWeather={updateWeather} error={error} />
    </div>
  );
}
