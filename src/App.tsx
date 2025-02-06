import "./App.css";

function App() {
  return (
    <>
      <div id="app" className="bg-main-gray">
        <main className="mx-auto w-full max-w-[430px] bg-white">
          {/* 메인 이미지 */}
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
          {/* <div className="relative max-h-[700px]">
            <img className="w-full h-full" src={wedding} alt="" />
          </div> */}
          {/* 간략한 인사 */}
          <article className="flex flex-col justify-center items-center px-4 py-20 min-h-[500px] text-center">
            <header className="mb-10 text-[1.1rem] text-main-green">
              소중한 분들을 초대합니다
            </header>

            <span className="text-[0.9rem]">
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
              <br />
              혹여 참석이 어려우시더라도 부담 갖지 마시고,
              <br /> 마음으로 축하해주시면 감사하겠습니다.
            </span>

            {/* 신랑신부 소개 */}
            <article className="flex flex-col justify-center items-center mt-10">
              <div className="flex justify-between items-center flex-wrap max-w-[240px]">
                <span>신랑부</span>&#183;
                <span>신랑모</span>
                <span className="text-[0.8rem]">
                  의<span className="inline-block min-w-8">아들</span>
                </span>
                <p className="w-3"></p> <span>보검</span>
              </div>
              <div className="flex justify-between items-center flex-wrap max-w-[240px]">
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

          {/* 일시, 장소, 캘린더 */}

          <article className="flex flex-col justify-center items-center px-4 py-10">
            <header className="mb-3 text-[1.1rem] text-main-green">
              예식안내
            </header>
            <span className="text-[0.9rem]">
              2025년 5월 18일 일요일 오후 1시 30분
            </span>
            <span className="text-[0.9rem]">더살롱드웨딩홀 1층 레터홀</span>
            <div className="mt-10 w-full h-[300px] bg-green-600">캘린더</div>
          </article>

          {/* 약도 */}
          <article className="flex flex-col justify-center items-center px-4 py-10">
            <header className="mb-10 text-[1.1rem] text-main-green">
              오시는 길
            </header>
            <span>더 살롱드 웨딩홀</span>
            <span className="text-[0.9rem]">1층 레터홀</span>
            <span className="text-[0.9rem]">
              제주특별자치도 서귀포시 서호동
            </span>
            <div className="w-full h-[300px] mt-8 bg-orange-400">지도</div>
          </article>

          <footer className="py-6 text-center text-[0.6rem]">
            <p>Copyright 2025</p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
