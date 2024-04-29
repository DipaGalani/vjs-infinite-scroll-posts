const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// fetch data from API
const getPost = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
};

// Show data in DOM
const showPosts = async () => {
  const posts = await getPost();
  //   console.log(posts);

  posts.forEach((post) => {
    console.log(post);
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <div class="post-info">
              <h2 class="post-title">${post.title}</h2>
              <p class="post-body">${post.body}</p>
          </div>
      `;
    postContainer.appendChild(postEl);
  });
};

// Show loader and fetch more posts
const showLoading = async () => {
  loading.classList.add("show");

  setTimeout(() => {
    page++;
    showPosts();
  }, 300);

  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000);
};

// Filter posts by Input
const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// Show initial posts
showPosts();

// scrollTop --> How far from the top of the page did we scroll
// scrollHeight --> The absolute height of the entire content (what is the actual height of the entire page with all its contents?)
// clientHeight --> The height of the visible screen
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
