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
  console.log(posts);

  posts.forEach((post) => {
    console.log(post);
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <div class="post-info">
              <h2 class="post-title>${post.title}</div>
              <p class="post-body>${post.body}</p>
          </div>
      `;
    postContainer.appendChild(postEl);
  });
};

// Show initial posts
showPosts();
