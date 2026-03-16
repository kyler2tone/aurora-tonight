"use client"

import { useEffect, useState } from "react"

export default function Home() {

  const [strength, setStrength] = useState("Loading...")
  const [visibility, setVisibility] = useState("Loading...")
  const [updated, setUpdated] = useState("--:--")

  useEffect(() => {

    async function getAurora() {

      const res = await fetch(
        "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json"
      )

      const data = await res.json()

      const avg =
        data.coordinates
          .map((c:any) => c[2])
          .reduce((a:number,b:number)=>a+b,0) /
        data.coordinates.length

      setStrength(avg.toFixed(1))

      if (avg > 50) setVisibility("Very High")
      else if (avg > 25) setVisibility("High")
      else if (avg > 10) setVisibility("Moderate")
      else setVisibility("Low")

      setUpdated(new Date().toLocaleTimeString())
    }

    getAurora()

  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-3xl px-6">

        <h1 className="text-6xl font-bold mb-6">
          Aurora Tonight
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          Can you see the Northern Lights tonight?
        </p>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Aurora Strength</p>
            <p className="text-3xl font-semibold mt-2">{strength}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Visibility</p>
            <p className="text-3xl font-semibold mt-2">{visibility}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Last Update</p>
            <p className="text-3xl font-semibold mt-2">{updated}</p>
          </div>

        </div>

      </div>
    </main>
  )
}