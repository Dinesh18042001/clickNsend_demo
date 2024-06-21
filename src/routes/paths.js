// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// ----------------------------------------------------------------------

export const MENU_PATH = {
  root: "/",
  login: "/login",
  blog: {
    root: "/blog",
    blogs: "/blogs",
    blog_detail: "/blogdetail",
  },
};
