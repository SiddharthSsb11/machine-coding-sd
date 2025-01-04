import { useEffect, useState } from "react";
import Signal from "./Signal";

export default function Traffic({ ligths = ["green", "yellow", "red"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((pervActive) => {
        return (pervActive + 1) % ligths.length;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {ligths.map((color, index) => {
        return <Signal key={index} isActive={active === index} color={color} />;
      })}
    </>
  );
}
