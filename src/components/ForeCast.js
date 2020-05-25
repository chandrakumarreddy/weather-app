import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "#fff",
  size: 100,
  animate: true,
};

const getIcon = (main) => {
  switch (main) {
    case "Haze":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Snow":
      return "SNOW";
    case "Dust":
      return "WIND";
    case "Drizzle":
      return "SLEET";
    case "Fog":
      return "FOG";
    case "Smoke":
      return "FOG";
    case "Tornado":
      return "WIND";
    default:
      return "CLEAR_DAY";
  }
};

export default function ForeCast({
  data: {
    main,
    weather,
    name,
    sys: { country },
  },
  updateWeather,
  error,
}) {
  const cityRef = React.useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cityRef.current.value) updateWeather(`q=${cityRef.current.value}`);
    cityRef.current.value = "";
  };
  return (
    <div className="foreCast">
      <ReactAnimatedWeather
        icon={getIcon(weather[0].main)}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
      <h1>{weather[0].main}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginTop: 20,
        }}
      >
        <input type="text" placeholder="search any city" ref={cityRef} />
        <button
          type="submit"
          style={{
            position: "absolute",
            right: 10,
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src="/search.png"
            alt="search"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </button>
      </form>
      <p style={{ color: "red", margin: 0, marginBottom: 20 }}>{error}</p>
      <h3>
        {name}, {country}
      </h3>
      <br />
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div>Temperature</div>
          <div>
            {main?.temp}°c ({weather[0].main})
          </div>
        </h3>
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div>Humidity</div>
          <div>{main?.humidity}</div>
        </h3>
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div>Pressure</div>
          <div>{main?.pressure}</div>
        </h3>
      </div>
    </div>
  );
}
