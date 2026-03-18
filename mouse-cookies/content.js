(function () {
  if (window.__mouseCookiesInjected) {
    return;
  }
  window.__mouseCookiesInjected = true;

  const ROOT_ID = "mouse-cookies-root";
  const COOKIE_SIZE = 52;
  const MAX_COOKIES = 6;
  const COOKIE_ACCEPT_PATTERN =
    /\b(accept|agree|allow|consent|got it|ok|okay|continue|enable)\b/i;
  const COOKIE_CONTEXT_PATTERN =
    /\b(cookie|cookies|privacy|consent|gdpr|tracking)\b/i;

  const state = {
    cookies: new Set(),
    heartTimeout: null,
    retreatTimeout: null
  };

  const root = document.createElement("div");
  root.id = ROOT_ID;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="mouse-cookies-stage">
      <div class="mouse-cookies-heart-zone"></div>
      <div class="mouse-cookies-hole">
        <div class="mouse-cookies-hole-shadow"></div>
        <div class="mouse-cookies-mouse">
          <div class="mouse-cookies-ear mouse-cookies-ear-left"></div>
          <div class="mouse-cookies-ear mouse-cookies-ear-right"></div>
          <div class="mouse-cookies-eye mouse-cookies-eye-left"></div>
          <div class="mouse-cookies-eye mouse-cookies-eye-right"></div>
          <div class="mouse-cookies-nose"></div>
        </div>
      </div>
      <div class="mouse-cookies-hearts"></div>
    </div>
  `;
  document.documentElement.appendChild(root);

  const stage = root.querySelector(".mouse-cookies-stage");
  const mouse = root.querySelector(".mouse-cookies-mouse");
  const hole = root.querySelector(".mouse-cookies-hole");
  const hearts = root.querySelector(".mouse-cookies-hearts");

  function normalizeText(value) {
    return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function looksLikeCookieBanner(element) {
    let node = element;
    for (let depth = 0; node && depth < 5; depth += 1) {
      const text = normalizeText(node.textContent).slice(0, 500);
      if (COOKIE_CONTEXT_PATTERN.test(text)) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function isLikelyCookieAcceptTarget(target) {
    if (!(target instanceof Element)) {
      return false;
    }

    const clickable = target.closest("button, a, [role='button'], input[type='button'], input[type='submit']");
    if (!clickable) {
      return false;
    }

    const text = normalizeText(
      clickable.getAttribute("aria-label") ||
        clickable.getAttribute("value") ||
        clickable.textContent
    );

    if (!COOKIE_ACCEPT_PATTERN.test(text)) {
      return false;
    }

    return looksLikeCookieBanner(clickable);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setCookiePosition(cookie, x, y) {
    cookie.style.left = `${x}px`;
    cookie.style.top = `${y}px`;
  }

  function spawnCookieTreat(originX, originY) {
    if (state.cookies.size >= MAX_COOKIES) {
      const oldest = state.cookies.values().next().value;
      if (oldest) {
        removeCookie(oldest);
      }
    }

    const cookie = document.createElement("div");
    cookie.className = "mouse-cookies-cookie";
    cookie.innerHTML = `
      <div class="mouse-cookies-chip chip-1"></div>
      <div class="mouse-cookies-chip chip-2"></div>
      <div class="mouse-cookies-chip chip-3"></div>
      <div class="mouse-cookies-chip chip-4"></div>
      <div class="mouse-cookies-chip chip-5"></div>
    `;

    const startX = clamp(originX - COOKIE_SIZE / 2, 12, window.innerWidth - COOKIE_SIZE - 12);
    const startY = clamp(originY - COOKIE_SIZE / 2, 12, window.innerHeight - COOKIE_SIZE - 120);
    setCookiePosition(cookie, startX, startY);
    stage.appendChild(cookie);
    state.cookies.add(cookie);

    requestAnimationFrame(() => {
      cookie.classList.add("is-visible");
    });

    attachDrag(cookie);
  }

  function removeCookie(cookie) {
    state.cookies.delete(cookie);
    cookie.classList.add("is-removing");
    window.setTimeout(() => {
      cookie.remove();
    }, 220);
  }

  function triggerHeartBurst() {
    clearTimeout(state.heartTimeout);
    clearTimeout(state.retreatTimeout);

    mouse.classList.add("is-fed");
    hearts.innerHTML = "";

    for (let index = 0; index < 3; index += 1) {
      const heart = document.createElement("div");
      heart.className = "mouse-cookies-heart";
      heart.textContent = "❤";
      heart.style.left = `${38 + index * 22}%`;
      heart.style.animationDelay = `${index * 80}ms`;
      hearts.appendChild(heart);
    }

    state.heartTimeout = window.setTimeout(() => {
      hearts.innerHTML = "";
      mouse.classList.remove("is-fed");
    }, 1300);

    state.retreatTimeout = window.setTimeout(() => {
      mouse.classList.add("is-hidden");
      window.setTimeout(() => {
        mouse.classList.remove("is-hidden");
      }, 1200);
    }, 300);
  }

  function intersectsHole(cookie) {
    const cookieRect = cookie.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    return !(
      cookieRect.right < holeRect.left ||
      cookieRect.left > holeRect.right ||
      cookieRect.bottom < holeRect.top ||
      cookieRect.top > holeRect.bottom
    );
  }

  function attachDrag(cookie) {
    let pointerId = null;
    let offsetX = 0;
    let offsetY = 0;

    function onPointerMove(event) {
      if (event.pointerId !== pointerId) {
        return;
      }

      const x = clamp(event.clientX - offsetX, 8, window.innerWidth - COOKIE_SIZE - 8);
      const y = clamp(event.clientY - offsetY, 8, window.innerHeight - COOKIE_SIZE - 8);
      setCookiePosition(cookie, x, y);
    }

    function onPointerUp(event) {
      if (event.pointerId !== pointerId) {
        return;
      }

      window.removeEventListener("pointermove", onPointerMove, true);
      window.removeEventListener("pointerup", onPointerUp, true);
      window.removeEventListener("pointercancel", onPointerUp, true);
      cookie.classList.remove("is-dragging");
      pointerId = null;

      if (intersectsHole(cookie)) {
        triggerHeartBurst();
        removeCookie(cookie);
      }
    }

    cookie.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();

      pointerId = event.pointerId;
      const rect = cookie.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;

      cookie.classList.add("is-dragging");
      cookie.setPointerCapture(pointerId);

      window.addEventListener("pointermove", onPointerMove, true);
      window.addEventListener("pointerup", onPointerUp, true);
      window.addEventListener("pointercancel", onPointerUp, true);
    });
  }

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!isLikelyCookieAcceptTarget(target)) {
        return;
      }

      const origin = target.getBoundingClientRect();
      const spawnCount = Math.random() > 0.55 ? 2 : 1;

      for (let index = 0; index < spawnCount; index += 1) {
        const offsetX = (Math.random() - 0.5) * 70;
        const offsetY = -10 - index * 16;
        spawnCookieTreat(origin.left + origin.width / 2 + offsetX, origin.top + offsetY);
      }
    },
    true
  );
})();
