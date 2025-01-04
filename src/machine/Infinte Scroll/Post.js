import { useEffect } from "react";

export default function Post({ data, setPageNo }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (param) => {
        if (param[0].isIntersecting) {
          observer.unobserve(lastImage);
          setPageNo((pageNo) => pageNo + 1);
        }
      },
      { threshold: 0.5 }
    );

    const lastImage = document.querySelector(".image-post:last-child");
    if (!lastImage) {
      return;
    }
    observer.observe(lastImage);

    return () => {
      if (lastImage) {
        observer.unobserve(lastImage);
      }
      observer.disconnect();
    };
  }, [data]);
  return (
    <div className="container">
      {data.map((item, index) => {
        return (
          <img className="image-post" key={item.id} src={item.download_url} />
        );
      })}
    </div>
  );
}
