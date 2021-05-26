import React, { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";

const accel = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [accelSub, setAccelSub] = useState(null);
  const [isAccelAvail, setIsAccelAvail] = useState(null);
  const [dir, setDir] = useState("RIGHT");

  const sensorSubscribe = (speed) => {
    Accelerometer.setUpdateInterval(speed);
    setAccelSub(
      Accelerometer.addListener((data) => {
        console.log(data);
        setData(data);
      })
    );
  };

  const unsubscribe = () => {
    accelSub && accelSub.remove();
    setAccelSub(null);
  };

  useEffect(() => {
    setIsAccelAvail(Accelerometer.isAvailableAsync());
  }, []);

  useEffect(() => {
    if (isAccelAvail) sensorSubscribe(64);
    else alert("tilt sensor not available");
    return () => unsubscribe();
  }, [isAccelAvail]);

  useEffect(() => {
    if (data.y > 0.2 && data.y > data.x) setDir("UP");
    if (data.y < 0 && data.x > data.y) setDir("DOWN");
    if (data.y < 0 && data.y > data.x) setDir("LEFT");
    if (data.x > 0.2 && data.x > data.y) setDir("RIGHT")
  }, [data]);

  return { data: data, dir: dir };
};

export default accel;
