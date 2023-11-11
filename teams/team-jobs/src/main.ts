import "./style.css";

document.querySelector<HTMLDivElement>(
  "#jobs-fragment-recommendation"
)!.innerHTML = `
<h2>추천 채용공고</h2>
<div class="recommendations"></div>
`;

fetch("/jobs/api/recommendations.json")
  .then((res) => res.json())
  .then((recommendations: { name: string; url: string }[]) => {
    document.querySelector(
      "#jobs-fragment-recommendation .recommendations"
    )!.innerHTML = recommendations
      .map(
        ({ name, url }) =>
          `<div><a href="${url}" target="_blank">${name}</a></div>`
      )
      .join("");

    document
      .querySelectorAll<HTMLAnchorElement>(".recommendations a")
      .forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          window.parent.location.href = a.href;
        });
      });
  });
