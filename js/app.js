// 동작 파일: 카테고리 탭, 상품 목록
// (장바구니는 4단계, 구매하기는 5단계, 언어 전환은 6단계에서 추가)

const LANG = "ko"; // 6단계에서 KO/EN 버튼과 연결

// '전체' 탭 + 상품마다 탭 하나 (탭 이름 = 상품 제목)
const ALL_TAB = { id: "all", title: { ko: "전체" } };

const tabsEl = document.getElementById("category-tabs");
const listEl = document.getElementById("product-list");

let currentTab = "all";

// 탭 그리기
function renderTabs() {
  const tabs = [ALL_TAB, ...PRODUCTS];
  tabsEl.innerHTML = tabs.map((tab) => {
    const active = tab.id === currentTab;
    return `<button type="button" class="tab${active ? " is-active" : ""}"
              data-tab="${tab.id}" aria-pressed="${active}">${tab.title[LANG]}</button>`;
  }).join("");
}

// 상품 카드 그리기 (선택한 탭의 상품만)
function renderProducts() {
  const shown = currentTab === "all"
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.id === currentTab);

  listEl.innerHTML = shown.map((product) => `
    <article class="product-card" style="--c1: ${product.colors[0]}; --c2: ${product.colors[1]};">
      <div class="product-body">
        <h3 class="product-title">${product.title[LANG]}</h3>
        <p class="product-price"><strong>₩0</strong> 무료 열람</p>
        <button type="button" class="button-cart" data-id="${product.id}">장바구니 담기</button>
      </div>
    </article>
  `).join("");
}

// 탭을 누르면 해당 상품만 보이기
tabsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".tab");
  if (!button) return;
  currentTab = button.dataset.tab;
  renderTabs();
  renderProducts();
});

renderTabs();
renderProducts();
