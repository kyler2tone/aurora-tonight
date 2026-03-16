"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [kp, setKp] = useState<number | null>(null);
  const [visibility, setVisibility] = useState("Loading...");
  const [visibilityColor, setVisibilityColor] = useState("text-gray-400");
  const [updated, setUpdated] = useState("");

  useEffect(() => {
  async function fetchAurora() {
    const res = await fetch(
      "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
    );

    const data = await res.json();
    const latest = data[data.length - 1];
    const kpValue = parseFloat(latest[1]);

    setKp(kpValue);

    if (kpValue >= 7) setVisibility("Aurora likely visible far south");
    else if (kpValue >= 6) setVisibility("Strong aurora activity");
    else if (kpValue >= 5) setVisibility("Good chance in northern US");
    else if (kpValue >= 4) setVisibility("Possible in northern states");
    else setVisibility("Mostly northern latitudes");
    if (kpValue >= 6) setVisibilityColor("text-green-400");
        else if (kpValue >= 4) setVisibilityColor("text-yellow-400");
    else setVisibilityColor("text-gray-400");

    setUpdated(new Date().toLocaleTimeString());
  }

  fetchAurora();

  const interval = setInterval(fetchAurora, 300000);

  return () => clearInterval(interval);

}, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-5xl px-6">

        <p className="text-lg text-gray-400 mb-2">
          Live Aurora Forecast
        </p>

        <h1 className="text-6xl font-bold mb-6">
          Aurora Tonight
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          Can you see the Northern Lights tonight?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Current KP Index</p>
            <p className="text-3xl font-semibold mt-2">
              {kp ?? "Loading"}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Aurora Visibility</p>
            <p className={`text-2xl font-semibold mt-2 ${visibilityColor}`}>
 		 {visibility}
	    </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Last Update</p>
            <p className="text-2xl font-semibold mt-2">
              {updated}
            </p>
          </div>
        </div>

	  <div className="mt-10 bg-gray-900 rounded-xl p-4">
  <p className="text-gray-400 text-sm mb-4">Live Aurora Forecast Map</p>
  <img
    src="https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"
    alt="Live aurora forecast map"
    className="w-full max-w-4xl mx-auto rounded-lg"
  />
</div>

<p className="text-gray-500 mt-4 text-sm text-center">
  Data and forecast imagery provided by NOAA Space Weather Prediction Center.
</p>

      </div>
    </main>
  );
}