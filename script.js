const films = [
  {
    id: "dune",
    name: "Дюна: Часть вторая",
    year: 2024,
    genre: "Фантастика",
    rating: "8.7",
    duration: "2 ч 46 мин",
    image: "дюна.jpeg",
    description:
      "Пол Атрейдес объединяется с Чани и фременами, чтобы отомстить за семью и остановить песчаную войну.",
  },
  {
    id: "interstellar",
    name: "Интерстеллар",
    year: 2014,
    genre: "Фантастика",
    rating: "8.6",
    duration: "2 ч 49 мин",
    image: "Interstellar_2014.jpg",
    description:
      "Команда исследователей отправляется за пределы галактики, чтобы найти новый дом для человечества.",
  },
  {
    id: "inception",
    name: "Начало",
    year: 2010,
    genre: "Триллер",
    rating: "8.8",
    duration: "2 ч 28 мин",
    image: "Poster_Inception_film_2010.jpg",
    description:
      "Мастер проникновения в сны получает необычное задание: внедрить идею в сознание человека.",
  },
  {
    id: "fight",
    name: "Бойцовский клуб",
    year: 1999,
    genre: "Драма",
    rating: "8.8",
    duration: "2 ч 19 мин",
    image: "Fight_club.jpg",
    description:
      "Знакомство с Тайлером Дёрденом меняет привычную жизнь рассказчика.",
  },
  {
    id: "matrix",
    name: "Матрица",
    year: 1999,
    genre: "Фантастика",
    rating: "8.7",
    duration: "2 ч 16 мин",
    image: "images.jpeg",
    description: "Нео узнаёт, что привычный мир скрывает невероятную тайну.",
  },
  {
    id: "harry",
    name: "Гарри Поттер",
    year: 2001,
    genre: "Фэнтези",
    rating: "8.6",
    duration: "2 ч 32 мин",
    image: "Harry_Potter_and_the_Philosopher's_Stone_—_movie.jpg",
    description: "Юный волшебник отправляется учиться в Хогвартс.",
  },
  {
    id: "titanic",
    name: "Титаник",
    year: 1997,
    genre: "Драма",
    rating: "8.9",
    duration: "3 ч 14 мин",
    image: "Постер.png",
    description: "История любви на борту легендарного океанского лайнера.",
  },
  {
    id: "rings",
    name: "Властелин колец",
    year: 2001,
    genre: "Фэнтези",
    rating: "8.8",
    duration: "2 ч 58 мин",
    image: "вл.jpeg",
    description:
      "Братство отправляется в опасный путь, чтобы уничтожить Кольцо Всевластия.",
  },
];
const params = new URLSearchParams(location.search),
  page = document.body.dataset.page || "home";
const film = films.find((f) => f.id === params.get("id")) || films[0];
const poster = (f) => `images/${encodeURIComponent(f.image)}`;
const link = (f) => `film.html?id=${f.id}`;
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
let favorites = read("cinewave-favorites", []),
  history = read("cinewave-history", []);
let account = read("cinewave-account", null),
  session = read("cinewave-session", false);
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const card = (f) =>
  `<article class="catalog-card"><a href="${link(f)}"><img src="${poster(f)}" alt="Постер: ${escapeHTML(f.name)}"></a><div><strong class="accent">★ ${f.rating}</strong><h3><a href="${link(f)}">${escapeHTML(f.name)}</a></h3><small>${f.year} · ${f.genre}</small><a class="text-link" href="${link(f)}">Подробнее →</a></div></article>`;
const tile = (f) =>
  `<article class="film-tile"><a href="${link(f)}"><img src="${poster(f)}" alt="Постер: ${escapeHTML(f.name)}"></a><button class="tile-heart" data-favorite="${f.id}" aria-label="Избранное">${favorites.includes(f.id) ? "♥" : "♡"}</button><h3><a href="${link(f)}">${escapeHTML(f.name)}</a></h3><small>★ ${f.rating} · ${f.year} · ${f.genre}</small></article>`;
const heading = (title, sub = "") =>
  `<div class="page-heading"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>`;
const views = {
  film: () =>
    `<div class="crumb"><a href="catalog.html">Каталог</a> / ${film.genre} / ${escapeHTML(film.name)}</div><div class="detail-hero"><img src="${poster(film)}" alt="Постер: ${escapeHTML(film.name)}"><div><span class="accent">ВЫБОР РЕДАКЦИИ</span><h1>${escapeHTML(film.name)}</h1><p class="detail-meta"><b>★ ${film.rating}</b>　${film.year}　 ·　 ${film.duration}　 ·　 16+</p><div class="tags"><span>${film.genre}</span><span>Приключения</span><span>Драма</span></div><p>${film.description}</p><div class="buttons"><a class="primary" href="watch.html?id=${film.id}">▶ Смотреть онлайн</a><button data-favorite="${film.id}">${favorites.includes(film.id) ? "♥ В избранном" : "♡ В избранное"}</button><button id="trailer">Смотреть трейлер</button></div></div></div><div class="detail-bottom"><div><h2>О фильме</h2><p>Режиссёр　　${film.id === "dune" ? "Дени Вильнёв" : "Информация не указана"}</p><p>Качество　　4K Ultra HD · Субтитры</p></div><aside><b class="accent">${film.rating}</b><div><h3>Впечатляющее путешествие</h3><p>Оценка зрителей CineWave</p></div></aside></div><h2 class="section-title">Похожие фильмы</h2><div class="catalog-grid">${films
      .filter((f) => f.id !== film.id)
      .slice(0, 4)
      .map(card)
      .join("")}</div>`,
  watch: () =>
    `<div class="watch-title"><h2><a href="${link(film)}">←</a> ${escapeHTML(film.name)}</h2><small>4K UHD · 16+</small></div><div class="player"><img src="${poster(film)}" alt="Постер фильма"><div class="player-message"><span>▶</span><p>Видео для этого фильма пока не добавлено</p></div></div><div class="watch-title"><div><h2>Приятного просмотра</h2><p>Вернитесь сюда, когда появится видео</p></div><a class="secondary" href="catalog.html">Ещё о фильмах</a></div>`,
};
if ((page === "film" || page === "watch") && params.has("id"))
  document.querySelector(".inner-page").innerHTML = views[page]();
if (page === "home") {
  document.querySelectorAll(".movie-card").forEach((el, i) => {
    const f = films[i];
    el.querySelectorAll("a").forEach((a) => (a.href = link(f)));
  });
  document
    .querySelectorAll(".release-card")
    .forEach((a, i) => (a.href = link([films[0], films[2], films[7]][i])));
  document.querySelector(".hero__btn").href = "catalog.html";
}
if (!session) {
  const avatar = document.querySelector(".avatar-link");
  if (avatar) {
    avatar.textContent = "Войти";
    avatar.href = "login.html";
    avatar.classList.add("login-link");
  }
}
const toggle = document.getElementById("themeToggle");
let theme = document.documentElement.dataset.theme || "light";
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  document.body.dataset.theme = t;
  toggle.querySelector("span").textContent = t === "dark" ? "☀️" : "🌙";
  localStorage.setItem("cinewave-theme", t);
}
setTheme(theme);
toggle.addEventListener("click", () =>
  setTheme(document.body.dataset.theme === "light" ? "dark" : "light"),
);
document.addEventListener("click", (e) => {
  const fav = e.target.closest("[data-favorite]");
  if (fav) {
    const id = fav.dataset.favorite;
    favorites = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    localStorage.setItem("cinewave-favorites", JSON.stringify(favorites));
    fav.textContent = favorites.includes(id)
      ? "♥ В избранном"
      : "♡ В избранное";
    if (page === "mine") renderMine();
  }
});
function renderCatalog() {
  let list = films.filter(
    (f) =>
      f.name
        .toLowerCase()
        .includes(
          document.getElementById("catalogSearch").value.toLowerCase(),
        ) &&
      (!document.getElementById("genre").value ||
        f.genre === document.getElementById("genre").value) &&
      (!document.getElementById("year").value ||
        f.year == document.getElementById("year").value),
  );
  let sort = document.getElementById("sort").value;
  if (sort === "new") list.sort((a, b) => b.year - a.year);
  if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  document.getElementById("catalogResults").innerHTML = list.length
    ? list.map(card).join("")
    : "<p>Ничего не найдено.</p>";
}
if (page === "catalog") {
  ["catalogSearch", "genre", "year", "sort"].forEach((id) =>
    document.getElementById(id).addEventListener("input", renderCatalog),
  );
  document.querySelectorAll("[data-type]").forEach(
    (btn) =>
      (btn.onclick = () => {
        document
          .querySelector("[data-type].selected")
          .classList.remove("selected");
        btn.classList.add("selected");
        document.getElementById("catalogResults").innerHTML =
          btn.dataset.type === "film"
            ? films.map(card).join("")
            : "<p>В этой категории пока нет записей.</p>";
      }),
  );
  renderCatalog();
}
if (page === "search") {
  const input = document.getElementById("searchInput");
  input.value = params.get("q") || "";
  const render = () => {
    const q = input.value.trim().toLowerCase();
    const found = q
      ? films.filter((f) =>
          `${f.name} ${f.genre} ${f.description}`.toLowerCase().includes(q),
        )
      : [];
    document.getElementById("searchCount").textContent =
      `Найдено: ${found.length}`;
    document.getElementById("searchResults").innerHTML = found.length
      ? found
          .map(
            (f) =>
              `<article class="search-result"><img src="${poster(f)}" alt=""><div><h2>${escapeHTML(f.name)}</h2><p>★ ${f.rating}　 ${f.year}　 ·　 ${f.duration}</p><p class="accent">${f.genre}</p><p>${f.description}</p><a class="primary" href="watch.html?id=${f.id}">▶ Смотреть</a> <a class="secondary" href="${link(f)}">Подробнее</a></div></article>`,
          )
          .join("")
      : "<p>Введите название или жанр фильма, чтобы начать поиск.</p>";
  };
  input.addEventListener("input", render);
  render();
}
function renderMine() {
  const tab =
    document.querySelector("[data-tab].selected")?.dataset.tab || "favorites";
  const ids = tab === "favorites" ? favorites : history;
  const list = ids.map((id) => films.find((f) => f.id === id)).filter(Boolean);
  document.getElementById("mineResults").innerHTML = list.length
    ? `<div class="tile-grid">${list.map(tile).join("")}</div>`
    : `<p class="empty-state">${tab === "favorites" ? "Вы ещё не добавили фильмы в избранное." : "История просмотров пока пуста."} <a href="catalog.html">Открыть каталог →</a></p>`;
}
if (page === "mine") {
  document.querySelector("[data-tab=favorites] span").textContent =
    favorites.length;
  document.querySelectorAll("[data-tab]").forEach(
    (btn) =>
      (btn.onclick = () => {
        document
          .querySelector("[data-tab].selected")
          .classList.remove("selected");
        btn.classList.add("selected");
        renderMine();
      }),
  );
  if (params.get("tab") === "history")
    document.querySelector('[data-tab="history"]').click();
  else renderMine();
}
if (page === "watch") {
  if (!history.includes(film.id)) {
    history.unshift(film.id);
    localStorage.setItem("cinewave-history", JSON.stringify(history));
  }
}
if (page === "film")
  document.getElementById("trailer").onclick = () =>
    alert("Трейлер пока не добавлен.");
if (["login", "register"].includes(page))
  document.getElementById("authForm").onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target),
      email = data.get("email").trim().toLowerCase(),
      password = data.get("password");
    const err = document.getElementById("authError");
    if (page === "register") {
      if (account && account.email === email) {
        err.textContent = "Аккаунт с таким адресом уже существует.";
        return;
      }
      account = { email, password, name: email.split("@")[0] };
      localStorage.setItem("cinewave-account", JSON.stringify(account));
    } else if (
      !account ||
      email !== account.email ||
      password !== account.password
    ) {
      err.textContent = "Неверный email или пароль.";
      return;
    }
    localStorage.setItem("cinewave-session", "true");
    location.href = "profile.html";
  };
if (page === "profile") {
  document.querySelector(".profile-card h2").textContent =
    account?.name || "Гость";
  document.querySelector(".profile-card p").textContent =
    account?.email || "Войдите в аккаунт";
  document.querySelector("#profileForm [name=name]").value =
    account?.name || "";
  document.querySelector("#profileForm input[disabled]").value =
    account?.email || "";
  document.getElementById("profileForm").onsubmit = (e) => {
    e.preventDefault();
    if (!session) {
      location.href = "login.html";
      return;
    }
    account.name = new FormData(e.target).get("name").trim();
    localStorage.setItem("cinewave-account", JSON.stringify(account));
    document.getElementById("profileNotice").textContent = "Сохранено";
  };
  document.getElementById("autoplay").onchange = (e) =>
    localStorage.setItem("cinewave-autoplay", JSON.stringify(e.target.checked));
  document.getElementById("logout").onclick = () => {
    localStorage.removeItem("cinewave-session");
    location.href = "index.html";
  };
}
