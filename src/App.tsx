import "./App.css";

function App() {
  return (
    <>
      <div className="flex justify-center bg-[#f8f8f8]">
        <div className="pb-20 w-[420px] bg-white">
          {/* 메인 이미지 */}
          <div className="h-[700px] bg-cover bg-[url(/wedding.jpg)]">
            <div className="flex justify-center items-end h-full">
              <p className="text-5xl text-center mb-50 text-[#fe7f9c] font-pinyon">
                we're getting <br /> married!
              </p>
            </div>
          </div>
          {/* 간략한 인사 */}
          <div className="flex flex-col justify-center items-center h-[350px] whitespace-nowrap text-center">
            <p className="mb-3 text-lg text-green-950">
              소중한 분들을 초대합니다
            </p>

            <div>
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
            </div>
          </div>
          {/* 신랑신부 소개 */}
          <div className="flex flex-col justify-center items-center h-[100px]">
            <div className="flex items-center">
              <p className="text-sm">신랑부&#183;신랑모 의 장남</p>
              <p className="w-3"></p>{" "}
              <span className="mr-1 text-sm text-[#147bb7]">신랑</span>
              <p>김준모</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm">신부부&#183;신부모 의 장녀</p>
              <p className="w-3"></p>
              <span className="mr-1 text-sm text-pink-300">신부</span>{" "}
              <p>김준모</p>
            </div>
          </div>
          {/* 일시, 장소, 캘린더 */}

          <div className="flex flex-col justify-center items-center h-[200px]">
            <p className="mb-3 text-lg text-green-950">예식안내</p>
            <p>2025년 5월 18일 일요일 오후 1시 30분</p>
            <p>더살롱드웨딩홀 1층 레터홀</p>
          </div>

          <div className="w-full h-[300px] bg-green-600">캘린더</div>

          {/* 약도 */}
          <div className="flex flex-col justify-center items-center mt-20">
            <p className="mb-20 text-lg text-green-950">오시는 길</p>
            <p>더 살롱드 웨딩홀</p>
            <p>1층 레터홀</p>
            <p>제주특별자치도 서귀포시 서호동</p>
            <div className="w-full h-[300px] mt-8 bg-orange-400">지도</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
