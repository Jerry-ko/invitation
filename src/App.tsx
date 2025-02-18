import { useEffect, useState } from "react";
import "./App.css";
const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

function App() {
  const [calendar, setCalendar] = useState<(number | null)[][]>([]);
  const [weddingDay, setWeddingDay] = useState(1);
  const [data, setDate] = useState([
    [1, 2, 3, 4],
    [1, 3, 4, 5, 7, 0],
    [4, 5, 6, 7],
    [3, 4, 5, 6],
  ]);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

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

  useEffect(() => {
    setLayout();
    let yOffset = 0;

    window.addEventListener("scroll", () => {
      yOffset = window.scrollY;
      console.log(sceneInfo[0].scrollHeight);

      if (yOffset > sceneInfo[0].scrollHeight * 0.3) {
        document.getElementById("scroll-section-1")?.classList.add("fade-up");
      }

      if (yOffset > sceneInfo[0].scrollHeight * 0.7) {
        document.getElementById("scroll-section-2")?.classList.add("fade-up");
      }

      if (
        yOffset >
        sceneInfo[0].scrollHeight +
          sceneInfo[2].scrollHeight +
          sceneInfo[1].scrollHeight * 0.5
      ) {
        document.getElementById("scroll-section-3")?.classList.add("fade-up");
      }
    });
  }, []);

  const clickNaverMap = () => {
    window.open(
      "http://map.naver.com/p?title=그랜드워커힐&lng=127.11170683593&lat=37.5586287308609&zoom=15&type=0&c=15.00,0,0,0,dh",
      "_blank"
    );
  };

  const clickKakaoMap = () => {};

  const clickTMap = () => {};

  const sceneInfo = [
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

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = document.getElementById(
        `scroll-section-${i}`
      )!.scrollHeight;
    }
  }

  window.addEventListener("resize", setLayout);

  window.addEventListener("beforeunload", () => {
    const sectionList = document.querySelectorAll("scroll-section");
    sectionList.forEach((el) => {
      el.classList.remove("fade-up");
    });
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div id="app" className="bg-main-gray">
        <main className="mx-auto w-full max-w-[430px] bg-white">
          {/* 메인 이미지 */}
          <div id="scroll-section-0" className="scroll-section couple">
            <figure className="relative w-full h-screen bg-cover bg-[url(/couple.jpg)]">
              <div className="relative flex justify-between p-4 text-main-pink font-noto-sans font-light">
                <span>LEE JIEUN</span> <span>PARK BOGUM</span>
              </div>
              <div>
                <div className="mx-auto text-[4rem] leading-18 text-center text-main-pink font-dancing">
                  we're getting <br /> married!
                </div>
              </div>

              <div className="absolute bottom-5 w-full text-center text-main-pink font-bombaram">
                <p>2025.01.23 SAT 11:00</p>
                <p>더 살롱드 웨딩홀</p>
              </div>
            </figure>
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

                {calendar.map((week, index) => {
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
