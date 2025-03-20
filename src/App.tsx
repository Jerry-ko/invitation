import { useEffect, useRef, useState } from "react";
import "./App.css";
const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

const initSceneInfo = [
  {
    scrollHeight: 0,
  },
  {
    scrollHeight: 0,
  },
  {
    scrollHeight: 0,
  },
  {
    scrollHeight: 0,
  },
];

function App() {
  const [calendar, setCalendar] = useState<(number | null)[][] | null>(null);
  const [weddingDay, setWeddingDay] = useState(1);
  const [sceneInfo, setSceneInfo] = useState(initSceneInfo);
  const [currentScene, setCurrentScene] = useState(0);
  const [path, setPath] = useState<string>("");
  const [initText, setInitText] = useState(
    "Quick brown fox jumps over the lazy dog."
  );
  const [text, setText] = useState(initText);
  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [movedDistance, setMovedDistance] = useState(0);

  let yOffset = 0;
  let prevScrollHeight = 0;

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    const textPath = document.querySelector("textPath");
    if (textPath) {
      const textlength = textPath.getComputedTextLength();
      setMaxTextWidth(textlength);
    }
  }, [initText, text]);

  useEffect(() => {
    if (movedDistance > maxTextWidth) {
      setText((t) => `${t} ${t}`);
    }
  }, [movedDistance, maxTextWidth]);

  //살펴보기기기
  useEffect(() => {
    if (currentScene != 0) return;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
      const init = `M ${lastX} ${lastY} `;
      setText(initText);
      setPath((a) => a + init);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        const x = e.offsetX;
        const y = e.offsetY;

        const path = document.querySelector("path");
        let movedDistance = path?.getTotalLength() ?? 0;

        setMovedDistance(movedDistance);
        setPath((prevPath) => prevPath + `L ${x} ${y}`);

        // Draw(x, y);
      }
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    /* div를 이용해 선을 그리려고 한 경우
     : 피타고라스의 정리와 직선의 기울기 이용 */
    // const Draw = (x: number, y: number) => {
    //   const line = document.createElement("div");
    //   line.classList.add("line");

    //   line.style.left = `${lastX - 25}px`;
    //   line.style.top = `${lastY - 25}px`;

    //   targetScene?.appendChild(line);

    //   if (lastX !== x || lastY !== y) {
    //     const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
    //     const angle = Math.atan2(y - lastY, x - lastX);

    //     line.style.width = `${line.offsetWidth + distance + 10}px`;
    //     line.style.transform = `rotate(${angle}rad)`;
    //   }

    //   lastX = x;
    //   lastY = y;
    // };

    const targetScene = document.getElementById("canvas");

    targetScene?.addEventListener("mousedown", handleMouseDown);
    targetScene?.addEventListener("mousemove", handleMouseMove);
    targetScene?.addEventListener("mouseup", handleMouseUp);
    targetScene?.addEventListener("mouseleave", handleMouseUp);

    return () => {
      targetScene?.removeEventListener("mousedown", handleMouseDown);
      targetScene?.removeEventListener("mousemove", handleMouseMove);
      targetScene?.removeEventListener("mouseup", handleMouseUp);
      targetScene?.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [currentScene]);

  // todo: 커스텀 훅 추출
  // 데이터 페칭 시 react router 또는 react query 사용
  useEffect(() => {
    // 결혼식이 20205.10.12일 경우
    const currentWeddingDay = 26;
    // 해당 달의 마지막 날짜 전체
    const lastDateOfTheMonth = new Date(2025, 10, 0);
    // 마지막 날의 요일
    const dayOfLastDate = new Date(lastDateOfTheMonth).getDay();
    // 마지막 날의 일자
    const dateOfLastDate = new Date(lastDateOfTheMonth).getDate();
    // 첫 날의 요일
    const dayIndexOfTheFirstDay = new Date("2025-10-1").getDay();
    const totalDays =
      dateOfLastDate + dayIndexOfTheFirstDay + (6 - dayOfLastDate);

    const arr: (number | null)[][] = [];
    let j = 0;
    let currentDate = 1;

    for (let i = 0; i < totalDays - 1; i++) {
      if (i == 0) {
        arr.push([]);
        arr[j].push(null);
      }

      if (i !== 0 && i < dayIndexOfTheFirstDay) {
        arr[j].push(null);
      }

      if (dayIndexOfTheFirstDay <= i && currentDate <= dateOfLastDate) {
        if (i % 7 == 0) {
          arr.push([]);
          j++;
          arr[j].push(currentDate);
          currentDate++;
        } else {
          arr[j].push(currentDate);
          currentDate++;
        }
      }

      if (dateOfLastDate < currentDate) {
        arr[j].push(null);
      }
    }

    setCalendar(arr);
    setWeddingDay(currentWeddingDay);
  }, []);

  // todo: 커스텀 훅으로 추출
  useEffect(() => {
    function refresh() {
      const sectionList = document.querySelectorAll("scroll-section");
      sectionList.forEach((el) => {
        el.classList.remove("fade-up");
      });
      window.scrollTo(0, 0);
    }
    window.addEventListener("beforeunload", refresh);
    window.addEventListener("resize", setLayout);

    return () => {
      window.removeEventListener("beforeunload", refresh);
      window.removeEventListener("resize", setLayout);
    };
  }, []);

  // todo: 커스텀 훅으로 추출
  useEffect(() => {
    setLayout();
  }, [calendar, weddingDay]);

  //살펴보기기기기
  // todo: 커스텀 훅으로 추출
  useEffect(() => {
    function scrollLoop() {
      prevScrollHeight = 0;

      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i]?.scrollHeight;
      }

      if (yOffset > prevScrollHeight + sceneInfo[currentScene]?.scrollHeight) {
        setCurrentScene(currentScene + 1);
      }
      if (yOffset < prevScrollHeight) {
        if (currentScene == 0) return;
        setCurrentScene(currentScene - 1);
      }
    }
    function handleScroll() {
      yOffset = window.scrollY;

      scrollLoop();

      if (yOffset > sceneInfo[0].scrollHeight * 0.3) {
        document.getElementById("scroll-section-1")?.classList.add("fade-up");
      }

      if (yOffset > sceneInfo[0].scrollHeight) {
        document.getElementById("scroll-section-2")?.classList.add("fade-up");
      }

      if (
        yOffset >
        sceneInfo[0].scrollHeight +
          sceneInfo[2].scrollHeight +
          sceneInfo[1].scrollHeight * 0.6
      ) {
        document.getElementById("scroll-section-3")?.classList.add("fade-up");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sceneInfo, currentScene]);

  //네이버 지도 geocode api 사용할 시 서버 구성해야함
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      });
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: map,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const clickNaverMap = () => {
    window.open(
      "http://map.naver.com/p?title=그랜드워커힐&lng=127.11170683593&lat=37.5586287308609&zoom=15&type=0&c=15.00,0,0,0,dh",
      "_blank"
    );
  };
  const clickKakaoMap = () => {};
  const clickTMap = () => {};

  // todo: 커스텀 훅으로 추출 후 각 useEffect에서 사용
  // 매번 재렌더링 시 새로 생성됨
  // 만약 useEffect에서 의존성으로 삼고 있다면 불필요하게 실행될 수 있음
  function setLayout() {
    const updatedSceneInfo = sceneInfo.map((_, index) => ({
      scrollHeight: document.getElementById(`scroll-section-${index}`)!
        .scrollHeight,
    }));
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = document.getElementById(
        `scroll-section-${i}`
      )!.scrollHeight;
    }
    setSceneInfo(updatedSceneInfo);
  }

  return (
    <>
      <div id="app" className="bg-main-gray">
        <main className="mx-auto w-full max-w-[430px] bg-white">
          {/* 메인 이미지 */}
          <div id="scroll-section-0" className="scroll-section couple">
            <div id="canvas">
              <figure className="relative w-full h-screen bg-cover bg-center bg-[url(/couple.jpg)]">
                <div className="relative flex justify-between p-4 text-main-pink font-noto-sans font-light">
                  <span>LEE JIEUN</span> <span>PARK BOGUM</span>
                </div>
                <div>
                  <div className="mx-auto text-[4rem] leading-18 text-center text-main-pink font-dancing">
                    <p className="slideIn"> we're getting</p>
                    <p className="slideIn"> married!</p>

                    {/* we're getting <br /> married! */}
                  </div>
                </div>

                <div className="absolute bottom-5 w-full text-center text-main-pink font-bombaram">
                  <p>2025.01.23 SAT 11:00</p>
                  <p>더 살롱드 웨딩홀</p>
                </div>
                <svg
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                >
                  <path
                    id="MyPath"
                    d={path}
                    // stroke="red"
                    // strokeWidth={8}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <text>
                    <textPath href="#MyPath">{text}</textPath>
                  </text>
                </svg>
              </figure>
            </div>
          </div>
          {/* <div className="relative max-h-[700px]">
            <img className="w-full h-full" src={wedding} alt="" />
          </div> */}
          {/* 간략한 인사 */}
          <div id="scroll-section-1" className="scroll-section">
            <article className="flex flex-col justify-center items-center px-4 py-20 min-h-[500px] text-center">
              <header className="mb-10 text-[1.1rem] text-light-pink fade-up in-view">
                소중한 분들을 초대합니다
              </header>

              <span className="text-[0.9rem] leading-7">
                오랜 기다림 속에서 저희 두 사람,
                <br />
                한 마음 되어 참된 사랑의 결실을
                <br />
                맺게 되었습니다.
                <br />
                편한 마음으로 오셔서
                <br />
                축하해주시면 감사하겠습니다.
                <br />
              </span>

              {/* 신랑신부 소개 */}
              <article className="flex flex-col justify-center items-center mt-10">
                <div className="flex justify-between items-center flex-wrap max-w-[240px] tracking-widest">
                  <span>신랑부</span>&#183;
                  <span>신랑모</span>
                  <span className="text-[0.8rem]">
                    의<span className="inline-block min-w-8">아들</span>
                  </span>
                  <p className="w-3"></p> <span>보검</span>
                </div>
                <div className="flex justify-between items-center flex-wrap max-w-[240px] tracking-widest">
                  <span>신랑부</span>&#183;
                  <span>신랑모</span>
                  <span className="text-[0.8rem]">
                    의<span className="inline-block min-w-8">딸</span>
                  </span>
                  <p className="w-3"></p>
                  <span>지은</span>
                </div>
              </article>
            </article>
          </div>
          {/* 일시, 장소, 캘린더 */}
          <div id="scroll-section-2" className="scroll-section">
            <article className="flex flex-col justify-center items-center px-4 py-10">
              <header className="mb-10 text-[1.1rem] text-light-pink">
                예식안내
              </header>
              <span className="text-center leading-7 text-[0.9rem]">
                2025년 5월 18일 일요일 오후 1시 30분
                <br />
                더살롱드웨딩홀 1층 레터홀
              </span>

              <div className="mt-10 max-w-[300px] w-full text-center">
                <p className="py-4 text-[1.5rem] text-light-pink">10월</p>
                <div className="grid grid-cols-7 gap-4 mb-[1em]">
                  {week.map((item, index) => {
                    return (
                      <p
                        className={`${index == 0 ? "text-light-pink" : ""}`}
                        key={index}
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>

                <div>
                  {calendar?.map((week, index) => {
                    return (
                      <div className="grid grid-cols-7" key={`week-${index}`}>
                        {week.map((day, idx) => {
                          return (
                            <div
                              className="flex justify-center items-center leading-10"
                              key={`day-${idx}`}
                            >
                              <div
                                className={` ${
                                  day == weddingDay
                                    ? "rounded-[50%] w-7 h-7 leading-7 text-white bg-light-pink"
                                    : idx % 7 == 0
                                    ? "text-light-pink"
                                    : ""
                                }`}
                              >
                                {day}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </div>
          {/* 약도 */}
          <div id="scroll-section-3" className="scroll-section">
            <article className="flex flex-col justify-center items-center px-4 py-10">
              <header className="mb-10 text-[1.1rem] text-light-pink">
                오시는 길
              </header>
              <span>더 살롱드 웨딩홀</span>
              <span className="text-[0.9rem]">1층 레터홀</span>
              <span className="text-[0.9rem]">
                제주특별자치도 서귀포시 서호동
              </span>
              <div id="map" className="w-full h-[300px] mt-8"></div>
              <div className="flex justify-between items-center w-full bg-main-gray">
                <button
                  className="w-1/2 p-2.5 text-[0.8rem] text-deep-gray cursor-pointer"
                  type="button"
                  onClick={clickNaverMap}
                >
                  네이버 지도
                </button>
                <div className="w-4 border-t border-semi-deep-gray rotate-90"></div>
                <button
                  className="w-1/2 p-2.5 text-[0.8rem] text-deep-gray cursor-pointer"
                  type="button"
                  onClick={clickKakaoMap}
                >
                  카카오 지도
                </button>
                <div className="w-4 border-t border-semi-deep-gray rotate-90"></div>
                <button
                  className="w-1/2 p-2.5 text-[0.8rem] text-deep-gray cursor-pointer"
                  type="button"
                  onClick={clickTMap}
                >
                  티맵
                </button>
              </div>
            </article>
          </div>
          <footer className="py-6 text-center text-[0.6rem]">
            <p>Copyright 2025</p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;

// 애니메이션이 나올 각 영역을 section으로 구분한다
// 애니메이션의 영역이 기본값은 opacity 0, transformY(50%)
// 스크롤 영역이 특정지점을 지나면 opacity 1, transformY(0)으로 조정
// --> 클래스를 추가, 특정지점을 어떤 기준으로 잡지?
