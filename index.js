const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categoryButton = document.querySelectorAll(".category button");

const baseurl = "https://newsapi.org/v2";

const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";

const backupImage =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80";

async function dataRequest(url) {
  try {
    const response = await fetch(baseurl + url + apiKey);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
function urlRequest(url) {
  dataRequest(url).then((data) =>
    data.articles.forEach(
      (article) =>
        (cards.innerHTML += `<div class="card">
      <div class="image">
        <img
          src=${article.urlToImage ? article.urlToImage : backupImage}
          alt="Default image"
        />
      </div>

      <div class="information">
        <div>
          <p class="info_title">
            ${article.title}
          </p>
          <p class="description">${
            article.description ? article.description : article.title
          }</p>
          <p class="time">
            <span> ${article.publishedAt.replace("Z", " ").split("T")[1]}</span>
            <span> ${article.publishedAt.replace("Z", " ").split("T")[0]}</span>
          </p>
        </div>

        <div class="other">
          <a class="source">${article.source.name}</a>
          <a class="url" target="_blank" href=${article.url}
            >Read Article <i class="bi bi-arrow-right"></i
          ></a>
        </div>
      </div>
</div>`)
    )
  );
}
urlRequest("/top-headlines?country=us");

category.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    cards.innerHTML = "";
    urlRequest(event.target.dataset.url);
    categoryButton.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  }
});
