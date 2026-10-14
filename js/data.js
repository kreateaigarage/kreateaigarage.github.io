// 상품 내용과 화면 글자 파일. 문구나 색을 고칠 때는 이 파일만 고치면 됩니다.
// 모든 문구는 ko(한국어)와 en(영어) 두 가지가 있습니다.

// ---------- 상품 ----------
// - title(제목)은 카테고리 탭 이름으로도 그대로 쓰입니다.
// - colors: 카드 색 [주색, 보조색]. 카드 바탕과 버튼 그라데이션에 쓰입니다.
// - detail(상세): [구매하기] 후 주문 화면에 보이는 내용. 덩어리 여러 개로 나뉩니다.
//     heading: 굵은 제목 줄 (없어도 됨)
//     note:    제목 옆 흐린 글씨 (없어도 됨)
//     items:   점(–)으로 나열하는 줄들 (없어도 됨)

const PRODUCTS = [
  {
    id: "ai-works",
    colors: ["#9B7BFF", "#FF5FAE"], // 보라 → 핑크
    title: { ko: "AI Works", en: "AI Works" },
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
      en: [
        {
          heading: "Seoul Apartment Price Prediction AI Project",
          note: "KAIST team project",
          items: ["Analysis of apartment prices and prediction ranges using statistical and AI models"],
        },
        {
          heading: "MAAATUNE · MAAATRIP · AI-created Animations & Toons",
          note: "Personal projects",
        },
      ],
    },
  },
  {
    id: "kaist",
    colors: ["#4F7BFF", "#5CC8FF"], // 파랑 → 하늘
    title: { ko: "KAIST AI/DX", en: "KAIST AI/DX" },
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
      en: [
        { heading: "KAIST Professional MBA", note: "Currently enrolled" },
        {
          heading: "AI·DX Courses",
          items: [
            "Digital Strategy",
            "AI Business Strategy",
            "AI for Business Applications",
            "AI-Driven Business Evolution: Strategy & Practice",
          ],
        },
      ],
    },
  },
  {
    id: "dx",
    colors: ["#FF8A3D", "#FF4F6E"], // 주황 → 다홍
    title: { ko: "DX", en: "DX" },
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
      en: [
        {
          heading: "Digital Channels, Services & Business Execution",
          items: [
            "LG Electronics · D2C Platform Partnership Marketing",
            "LG Electronics · WashTower Compact D2C Launch & Digital Marketing",
          ],
        },
      ],
    },
  },
  {
    id: "current",
    colors: ["#34E0A1", "#22B8CF"], // 민트 → 청록
    title: { ko: "현재 업무", en: "Current Role" },
    detail: {
      ko: [
        { heading: "LG전자", items: ["LG AI Home 마케팅 전략 및 운영"] },
      ],
      en: [
        { heading: "LG Electronics", items: ["LG AI Home Marketing Strategy & Operations"] },
      ],
    },
  },
  {
    id: "education",
    colors: ["#7A6BFF", "#C29BFF"], // 남보라 → 연보라
    title: { ko: "학력", en: "Education" },
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
      en: [
        {
          items: [
            "KAIST · Professional MBA · Currently enrolled",
            "Korea University · B.A. in English Language and Literature · Graduated",
            "Hanyoung Foreign Language High School · English Department · Graduated",
          ],
        },
      ],
    },
  },
  {
    id: "hobby",
    colors: ["#FF5FAE", "#FFB38A"], // 핑크 → 복숭아
    title: { ko: "취미", en: "Hobbies" },
    detail: {
      ko: [
        {
          items: [
            "AI 공부 · AI Creations(소프트웨어·아트워크 등) · 음악 감상 · 글램핑 및 여행 · 맛집 탐험",
            "향후 계획: 탁구",
          ],
        },
      ],
      en: [
        {
          items: [
            "AI study · AI creations (software, artwork, etc.) · Music · Glamping & travel · Exploring great restaurants",
            "Future plan: Table tennis",
          ],
        },
      ],
    },
  },
  {
    id: "heroes",
    colors: ["#FFD24D", "#FF9F43"], // 금색 → 호박색
    title: { ko: "커리어 히어로", en: "Career Heroes" },
    detail: {
      ko: [
        { items: ["제프리 힌튼 · 스티브 잡스 · 젠슨 황"] },
      ],
      en: [
        { items: ["Geoffrey Hinton · Steve Jobs · Jensen Huang"] },
      ],
    },
  },
];

// ---------- 화면 글자 ----------
// {n}은 숫자, {no}는 주문번호로 바뀝니다.
// {s}는 영어에서 숫자가 1이 아니면 "s"가 붙습니다 (1 item, 2 items).

const UI_TEXT = {
  ko: {
    pageTitle: "KREATE AI GARAGE · 임태훈",
    search: "AI · DX · KAIST 검색",
    cartOpenLabel: "장바구니 열기",
    bannerLabel: "TODAY'S PICK · 오늘의 특가",
    bannerName: "임태훈",
    bannerNameSub: "TAEHOUN LIM",
    bannerTagline: "Data로 만들고, AI로 해결합니다",
    bannerButton: "AI Works 보기",
    tabsLabel: "카테고리",
    tabAll: "전체",
    addAll: "전체 담기",
    allAdded: "모두 담김 ✓",
    viewCart: "장바구니 보기",
    price: "무료 열람",
    addToCart: "장바구니 담기",
    added: "담김 ✓",
    toastAdded: "장바구니에 담았습니다",
    toastAddedAll: "{n}개 상품을 담았습니다",
    toastClearedAll: "장바구니를 모두 비웠습니다",
    cartTitle: "장바구니",
    cartCloseLabel: "장바구니 닫기",
    remove: "삭제",
    cartEmpty: "장바구니가 비어 있습니다.",
    browse: "상품 보러 가기",
    summaryItems: "상품",
    summaryCount: "{n}개",
    summaryTotal: "총 결제금액",
    summaryDelivery: "배송",
    summaryDeliveryValue: "즉시 열람",
    checkout: "구매하기",
    orderTitle: "주문이 완료되었습니다",
    orderNumber: "주문번호 {no}",
    orderMeta: "상품 {n}개 · 결제금액 ₩0 · 즉시 열람",
    orderFoot: "협업·스카우트 제안은 GitHub로 보내주세요.",
    continueShopping: "쇼핑 계속하기",
    sellerTitle: "판매자 정보",
    sellerLine: "판매자 임태훈 (Taehoun Lim) · 소재지 서울 · 문의",
    sellerNote: "이 사이트의 모든 상품은 무료이며 실제로 판매되지 않습니다.",
  },
  en: {
    pageTitle: "KREATE AI GARAGE · Taehoun Lim",
    search: "Search AI · DX · KAIST",
    cartOpenLabel: "Open cart",
    bannerLabel: "TODAY'S PICK",
    bannerName: "Taehoun Lim",
    bannerNameSub: "임태훈",
    bannerTagline: "Built with Data, Solved with AI",
    bannerButton: "View AI Works",
    tabsLabel: "Categories",
    tabAll: "All",
    addAll: "Add All",
    allAdded: "All Added ✓",
    viewCart: "View Cart",
    price: "Free to view",
    addToCart: "Add to Cart",
    added: "Added ✓",
    toastAdded: "Added to cart",
    toastAddedAll: "Added {n} item{s}",
    toastClearedAll: "Cart cleared",
    cartTitle: "Cart",
    cartCloseLabel: "Close cart",
    remove: "Remove",
    cartEmpty: "Your cart is empty.",
    browse: "Browse Items",
    summaryItems: "Items",
    summaryCount: "{n}",
    summaryTotal: "Total",
    summaryDelivery: "Delivery",
    summaryDeliveryValue: "Instant access",
    checkout: "Checkout",
    orderTitle: "Your order is complete",
    orderNumber: "Order No. {no}",
    orderMeta: "{n} item{s} · Total ₩0 · Instant access",
    orderFoot: "For collaboration or recruiting inquiries, reach out on GitHub.",
    continueShopping: "Continue Shopping",
    sellerTitle: "Seller Information",
    sellerLine: "Seller: Taehoun Lim · Location: Seoul · Contact:",
    sellerNote: "All items on this site are free and not actually for sale.",
  },
};
