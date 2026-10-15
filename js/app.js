// 동작 파일: 카테고리 탭, 상품 목록, 장바구니, 구매하기(주문 완료·상세 화면), 언어 전환(KO/EN)

// 장바구니와 언어를 브라우저에 기억할 때 쓰는 이름
const CART_KEY = "kreateaigarage-cart";
const LANG_KEY = "kreateaigarage-lang";

let LANG = loadLang(); // 지금 화면 언어: "ko" 또는 "en"

const shopEl = document.getElementById("shop");
const bannerAddButton = document.getElementById("banner-add");
const tabsEl = document.getElementById("category-tabs");
const listEl = document.getElementById("product-list");
const cartOpenButton = document.getElementById("cart-open");
const cartCountEl = document.getElementById("cart-count");
const cartOpenMainButton = document.getElementById("cart-open-main");
const cartCountMainEl = document.getElementById("cart-count-main");
const addAllButton = document.getElementById("add-all");
const cartEl = document.getElementById("cart");
const cartOverlayEl = document.getElementById("cart-overlay");
const cartCloseButton = document.getElementById("cart-close");
const cartHeadCountEl = document.getElementById("cart-head-count");
const cartItemsEl = document.getElementById("cart-items");
const cartSummaryEl = document.getElementById("cart-summary");
const cartSummaryCountEl = document.getElementById("cart-summary-count");
const cartBuyButton = document.getElementById("cart-buy");
const orderEl = document.getElementById("order");
const orderTitleEl = document.getElementById("order-title");
const orderNumberEl = document.getElementById("order-number");
const orderMetaEl = document.getElementById("order-meta");
const orderItemsEl = document.getElementById("order-items");
const continueShoppingButton = document.getElementById("continue-shopping");
const toastEl = document.getElementById("toast");
const toastTextEl = document.getElementById("toast-text");
const toastOpenCartButton = document.getElementById("toast-open-cart");
const langToggleEl = document.getElementById("lang-toggle");

let currentTab = "all";
let cart = loadCart(); // 담은 상품 번호 목록 (담은 순서대로)
let toastTimer = null;
let cartOpener = null; // 장바구니 창을 연 버튼 (닫으면 그 버튼으로 돌아가기)
let orderOpenedHere = false; // 이 페이지 안에서 [구매하기]로 주문 화면을 열었는지

// ---------- 장바구니 기억하기 (방문자 브라우저 안에만 저장) ----------

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(saved)) return [];
    // 지금도 있는 상품만 남기기 (상품을 지운 뒤에도 오류가 나지 않게)
    return saved.filter((id) => PRODUCTS.some((product) => product.id === id));
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // 저장이 막힌 브라우저(사생활 보호 모드 등)에서는 기억하지 않고 그냥 넘어감
  }
}

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

// ---------- 언어 ----------

// 기억한 언어가 있으면 그것, 없으면 방문자 브라우저 언어 (한국어면 ko, 그 외에는 en)
function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ko" || saved === "en") return saved;
  } catch {
    // 저장이 막힌 브라우저에서는 브라우저 언어로
  }
  return (navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en";
}

// 화면 글자 가져오기: t("orderMeta", { n: 3 }) → "상품 3개 · …"
function t(key, vars = {}) {
  return UI_TEXT[LANG][key]
    .replace("{n}", vars.n)
    .replace("{no}", vars.no)
    .replace("{s}", vars.n === 1 ? "" : "s");
}

// index.html에서 data-i18n 표시가 있는 글자들을 지금 언어로 바꾸기
function applyStaticText() {
  document.documentElement.lang = LANG; // 화면 낭독 프로그램이 알맞은 발음으로 읽도록
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  langToggleEl.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === LANG;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active);
  });
}

function setLang(lang) {
  LANG = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // 저장이 막힌 브라우저에서는 이번 방문 동안만 적용
  }
  applyStaticText();
  renderTabs();
  refresh();
}

// 담기 ↔ 빼기
function toggleCart(id) {
  if (cart.includes(id)) {
    cart = cart.filter((cartId) => cartId !== id);
  } else {
    cart.push(id);
    showToast(t("toastAdded"));
  }
  saveCart();
  refresh();
}

// 아직 담지 않은 상품을 모두 담기
function addAll() {
  const missing = PRODUCTS.filter((product) => !cart.includes(product.id));
  if (missing.length === 0) return;
  cart.push(...missing.map((product) => product.id));
  saveCart();
  refresh();
  showToast(t("toastAddedAll", { n: missing.length }));
}

// 담은 상품을 모두 빼기 ([모두 담김 ✓]을 다시 눌렀을 때)
function clearAll() {
  cart = [];
  saveCart();
  refresh();
  showToast(t("toastClearedAll"), { withCartButton: false });
}

// 장바구니가 바뀌면 화면 전체를 다시 그리기
function refresh() {
  renderProducts();
  renderCart();
  updateView();
}

// ---------- 그리기 ----------

// 탭 그리기
function renderTabs() {
  // '전체' 탭 + 상품마다 탭 하나 (탭 이름 = 상품 제목)
  const tabs = [{ id: "all", label: t("tabAll") }, ...PRODUCTS.map((product) => ({ id: product.id, label: product.title[LANG] }))];
  tabsEl.innerHTML = tabs.map((tab) => {
    const active = tab.id === currentTab;
    return `<button type="button" class="tab${active ? " is-active" : ""}"
              data-tab="${tab.id}" aria-pressed="${active}">${tab.label}</button>`;
  }).join("");
}

// 상품 카드 그리기 (선택한 탭의 상품만)
function renderProducts() {
  const shown = currentTab === "all"
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.id === currentTab);

  listEl.innerHTML = shown.map((product) => {
    const added = cart.includes(product.id);
    return `
      <article class="product-card" style="--c1: ${product.colors[0]}; --c2: ${product.colors[1]};">
        <div class="product-body">
          <h3 class="product-title">${product.title[LANG]}</h3>
          <p class="product-price"><strong>₩0</strong> ${t("price")}</p>
          <button type="button" class="button-cart${added ? " is-added" : ""}"
                  data-id="${product.id}" aria-pressed="${added}">${added ? t("added") : t("addToCart")}</button>
        </div>
      </article>
    `;
  }).join("");
}

// 장바구니 개수와 창 안의 목록 그리기
function renderCart() {
  const count = cart.length;
  cartCountEl.textContent = count;
  cartCountMainEl.textContent = count;
  cartHeadCountEl.textContent = `(${count})`;
  cartSummaryCountEl.textContent = t("summaryCount", { n: count });
  cartSummaryEl.hidden = count === 0;

  // 모두 담겨 있으면 [전체 담기]를 [모두 담김 ✓]으로 (다시 누르면 모두 빼기)
  const allAdded = count === PRODUCTS.length;
  addAllButton.classList.toggle("is-added", allAdded);
  addAllButton.setAttribute("aria-pressed", allAdded);
  addAllButton.textContent = allAdded ? t("allAdded") : t("addAll");

  // 배너의 [AI Works 담기] ↔ [AI Works 담김 ✓]
  const bannerAdded = cart.includes("ai-works");
  bannerAddButton.setAttribute("aria-pressed", bannerAdded);
  bannerAddButton.textContent = bannerAdded ? t("bannerAdded") : t("bannerAdd");

  if (count === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <p>${t("cartEmpty")}</p>
        <button type="button" class="button-secondary" data-action="browse">${t("browse")}</button>
      </div>
    `;
    return;
  }

  cartItemsEl.innerHTML = cart.map((id) => {
    const product = findProduct(id);
    return `
      <div class="cart-item" style="--c1: ${product.colors[0]}; --c2: ${product.colors[1]};">
        <div class="cart-item-text">
          <p class="cart-item-title">${product.title[LANG]}</p>
          <p class="cart-item-price">₩0</p>
        </div>
        <button type="button" class="cart-item-remove" data-remove="${product.id}">${t("remove")}</button>
      </div>
    `;
  }).join("");
}

// 주문 완료 화면 그리기: 주문번호 + 담은 상품의 상세 내용
function renderOrder() {
  const today = new Date();
  const date = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("");
  const count = cart.length;

  orderNumberEl.textContent = t("orderNumber", { no: `KAG-${date}-${String(count).padStart(2, "0")}` });
  orderMetaEl.textContent = t("orderMeta", { n: count });

  orderItemsEl.innerHTML = cart.map((id) => {
    const product = findProduct(id);
    const blocks = product.detail[LANG].map((block) => `
      <div class="detail-block">
        ${block.heading ? `<p class="detail-heading">${block.heading}${block.note ? ` <span class="detail-note">· ${block.note}</span>` : ""}</p>` : ""}
        ${block.items ? `<ul class="detail-list">${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      </div>
    `).join("");

    return `
      <article class="order-item" style="--c1: ${product.colors[0]}; --c2: ${product.colors[1]};">
        <h3 class="order-item-title">${product.title[LANG]}</h3>
        ${blocks}
      </article>
    `;
  }).join("");
}

// ---------- 상품 화면 ↔ 주문 화면 ----------
// 주소 끝이 #order이고 장바구니에 상품이 있으면 주문 화면, 아니면 상품 화면

function updateView() {
  const showOrder = location.hash === "#order" && cart.length > 0;
  const switched = showOrder === orderEl.hidden; // 화면이 바뀌는 순간인지

  shopEl.hidden = showOrder;
  orderEl.hidden = !showOrder;
  if (showOrder) renderOrder();
  else orderOpenedHere = false;

  // 화면이 바뀔 때만 맨 위로 이동 (같은 화면 안의 이동은 그대로)
  if (switched) {
    window.scrollTo(0, 0);
    if (showOrder) orderTitleEl.focus();
  }
}

function buy() {
  if (cart.length === 0) return;
  closeCart();
  if (location.hash === "#order") {
    // 이미 주문 화면에서 다시 구매한 경우: 내용만 새로 그리고 맨 위로
    updateView();
    window.scrollTo(0, 0);
    orderTitleEl.focus();
  } else {
    orderOpenedHere = true;
    location.hash = "order"; // 주소가 바뀌면 아래 hashchange에서 화면 전환
  }
}

function goShop() {
  if (orderOpenedHere) {
    history.back(); // 구매 전 주소로 돌아가기 (휴대폰 뒤로 가기와 같음)
  } else {
    // 주문 화면 주소로 바로 들어온 경우: 주소에서 #order만 지우기
    history.replaceState(null, "", location.pathname + location.search);
    updateView();
  }
}

// ---------- 장바구니 창 열고 닫기 ----------

function openCart() {
  // 알림 속 버튼으로 열었으면, 닫을 때는 알림 대신 상단 장바구니 아이콘으로 돌아가기
  cartOpener = toastEl.contains(document.activeElement) ? cartOpenButton : document.activeElement;
  hideToast();
  cartEl.inert = false;
  cartEl.classList.add("is-open");
  cartOverlayEl.classList.add("is-open");
  document.body.classList.add("is-cart-open"); // 뒤 페이지 스크롤 막기
  cartCloseButton.focus();
}

function closeCart() {
  cartEl.classList.remove("is-open");
  cartOverlayEl.classList.remove("is-open");
  document.body.classList.remove("is-cart-open");
  cartEl.inert = true; // 닫힌 창은 Tab 키로도 들어가지 않게
  (cartOpener || cartOpenButton).focus();
}

// ---------- 알림 ----------

function showToast(message, { withCartButton = true } = {}) {
  toastTextEl.textContent = message;
  toastOpenCartButton.hidden = !withCartButton;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2500);
}

function hideToast() {
  clearTimeout(toastTimer);
  toastEl.classList.remove("is-visible");
}

// ---------- 누르면 일어나는 일 ----------

// 탭을 누르면 해당 상품만 보이기
tabsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".tab");
  if (!button) return;
  currentTab = button.dataset.tab;
  renderTabs();
  renderProducts();
});

// 카드의 [장바구니 담기] / [담김 ✓]
listEl.addEventListener("click", (event) => {
  const button = event.target.closest(".button-cart");
  if (!button) return;
  const id = button.dataset.id;
  toggleCart(id);
  // 다시 그린 뒤에도 키보드 위치가 같은 버튼에 남도록
  listEl.querySelector(`[data-id="${id}"]`).focus();
});

// 장바구니 창 안의 [삭제], [상품 보러 가기]
cartItemsEl.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    toggleCart(removeButton.dataset.remove);
    cartCloseButton.focus(); // 지운 줄이 사라져도 키보드 위치를 창 안에 유지
    return;
  }
  if (event.target.closest('[data-action="browse"]')) {
    closeCart();
    if (!orderEl.hidden) goShop(); // 주문 화면이면 상품 화면 맨 위로
    else tabsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

cartOpenButton.addEventListener("click", openCart);
cartOpenMainButton.addEventListener("click", openCart);
cartCloseButton.addEventListener("click", closeCart);
cartOverlayEl.addEventListener("click", closeCart);
toastOpenCartButton.addEventListener("click", openCart);
cartBuyButton.addEventListener("click", buy);
continueShoppingButton.addEventListener("click", goShop);

// 배너의 [AI Works 담기]: 카드의 담기 버튼과 같은 동작
bannerAddButton.addEventListener("click", () => toggleCart("ai-works"));

// [전체 담기] ↔ [모두 담김 ✓]
addAllButton.addEventListener("click", () => {
  if (cart.length === PRODUCTS.length) clearAll();
  else addAll();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartEl.classList.contains("is-open")) closeCart();
});

// 주소 끝(#order 등)이 바뀌면 화면 전환 (뒤로 가기 버튼 포함)
window.addEventListener("hashchange", updateView);

// KO / EN 버튼
langToggleEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button || button.dataset.lang === LANG) return;
  setLang(button.dataset.lang);
});

// ---------- 처음 그리기 ----------

applyStaticText();
renderTabs();
refresh();
