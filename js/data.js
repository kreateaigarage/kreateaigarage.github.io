// 상품 내용 파일. 문구나 색을 고칠 때는 이 파일만 고치면 됩니다.
// - title(제목)은 카테고리 탭 이름으로도 그대로 쓰입니다.
// - colors: 카드 색 [주색, 보조색]. 카드 바탕과 버튼 그라데이션에 쓰입니다.
// - detail(상세): [구매하기] 후 주문 화면에 보이는 내용. 덩어리 여러 개로 나뉩니다.
//     heading: 굵은 제목 줄 (없어도 됨)
//     note:    제목 옆 흐린 글씨 (없어도 됨)
//     items:   점(–)으로 나열하는 줄들 (없어도 됨)
// - ko: 한국어 문구 (6단계에서 en: 영어 문구를 추가)

const PRODUCTS = [
  {
    id: "ai-works",
    colors: ["#9B7BFF", "#FF5FAE"], // 보라 → 핑크
    title: { ko: "AI Works" },
    detail: {
      ko: [
        {
          heading: "서울 아파트 시세 예측 AI 프로젝트",
          note: "KAIST 팀 프로젝트",
          items: ["통계·AI 모델을 활용한 아파트 시세 및 예측 범위 분석 프로젝트"],
        },
        {
          heading: "MAAATUNE · MAAATRIP · AI-created Animations & Toons",
          note: "개인 프로젝트",
        },
      ],
    },
  },
  {
    id: "kaist",
    colors: ["#4F7BFF", "#5CC8FF"], // 파랑 → 하늘
    title: { ko: "KAIST AI/DX" },
    detail: {
      ko: [
        { heading: "KAIST Professional MBA", note: "재학" },
        {
          heading: "AI·DX 수강 과목",
          items: [
            "디지털 전략",
            "인공지능 비즈니스 전략",
            "비즈니스 응용을 위한 인공지능",
            "AI 기반 비즈니스 진화: 전략 및 실습",
          ],
        },
      ],
    },
  },
  {
    id: "dx",
    colors: ["#FF8A3D", "#FF4F6E"], // 주황 → 다홍
    title: { ko: "DX" },
    detail: {
      ko: [
        {
          heading: "디지털 채널·서비스 및 사업 실행",
          items: [
            "LG전자 · D2C 플랫폼 제휴 마케팅",
            "LG전자 · WashTower Compact D2C 출시 및 디지털 마케팅",
          ],
        },
      ],
    },
  },
  {
    id: "current",
    colors: ["#34E0A1", "#22B8CF"], // 민트 → 청록
    title: { ko: "현재 업무" },
    detail: {
      ko: [
        { heading: "LG전자", items: ["LG AI Home 마케팅 전략 및 운영"] },
      ],
    },
  },
  {
    id: "education",
    colors: ["#7A6BFF", "#C29BFF"], // 남보라 → 연보라
    title: { ko: "학력" },
    detail: {
      ko: [
        {
          items: [
            "KAIST · Professional MBA · 재학",
            "고려대학교 · 영어영문학 학사 · 졸업",
            "한영외국어고등학교 · 영어과 · 졸업",
          ],
        },
      ],
    },
  },
  {
    id: "hobby",
    colors: ["#FF5FAE", "#FFB38A"], // 핑크 → 복숭아
    title: { ko: "취미" },
    detail: {
      ko: [
        {
          items: [
            "AI 공부 · AI Creations(소프트웨어·아트워크 등) · 음악 감상 · 글램핑 및 여행 · 맛집 탐험",
            "향후 계획: 탁구",
          ],
        },
      ],
    },
  },
  {
    id: "heroes",
    colors: ["#FFD24D", "#FF9F43"], // 금색 → 호박색
    title: { ko: "커리어 히어로" },
    detail: {
      ko: [
        { items: ["제프리 힌튼 · 스티브 잡스 · 젠슨 황"] },
      ],
    },
  },
];
