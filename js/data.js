// 상품 내용 파일. 문구나 색을 고칠 때는 이 파일만 고치면 됩니다.
// - title(제목)은 카테고리 탭 이름으로도 그대로 쓰입니다.
// - desc(한 줄 설명)는 카드에는 보이지 않고, 장바구니·상세 화면에서 쓸 예정입니다.
// - colors: 카드 색 [주색, 보조색]. 카드 바탕과 버튼 그라데이션에 쓰입니다.
// - ko: 한국어 문구 (6단계에서 en: 영어 문구를 추가)

const PRODUCTS = [
  {
    id: "ai-works",
    colors: ["#9B7BFF", "#FF5FAE"], // 보라 → 핑크
    title: { ko: "AI Works" },
    desc: { ko: "서울 아파트 시세 예측 AI(KAIST 팀) · MAAATUNE · MAAATRIP 등" },
  },
  {
    id: "kaist",
    colors: ["#4F7BFF", "#5CC8FF"], // 파랑 → 하늘
    title: { ko: "KAIST AI/DX" },
    desc: { ko: "KAIST Professional MBA에서 수강한 AI·DX 과목 4개" },
  },
  {
    id: "dx",
    colors: ["#FF8A3D", "#FF4F6E"], // 주황 → 다홍
    title: { ko: "DX" },
    desc: { ko: "LG전자 D2C 플랫폼 제휴 마케팅 · WashTower Compact D2C 출시" },
  },
  {
    id: "current",
    colors: ["#34E0A1", "#22B8CF"], // 민트 → 청록
    title: { ko: "현재 업무" },
    desc: { ko: "LG전자 · LG AI Home 마케팅 전략 및 운영" },
  },
  {
    id: "education",
    colors: ["#7A6BFF", "#C29BFF"], // 남보라 → 연보라
    title: { ko: "학력" },
    desc: { ko: "KAIST Professional MBA 재학 · 고려대 영어영문학 · 한영외고 영어과" },
  },
  {
    id: "hobby",
    colors: ["#FF5FAE", "#FFB38A"], // 핑크 → 복숭아
    title: { ko: "취미" },
    desc: { ko: "AI 공부 · AI Creations · 음악 · 글램핑·여행 · 맛집 탐험" },
  },
  {
    id: "heroes",
    colors: ["#FFD24D", "#FF9F43"], // 금색 → 호박색
    title: { ko: "커리어 히어로" },
    desc: { ko: "제프리 힌튼 · 스티브 잡스 · 젠슨 황" },
  },
];
