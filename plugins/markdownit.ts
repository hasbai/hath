import MD from "markdown-it";
import anchor from "markdown-it-anchor";
import uslug from "uslug";

export default defineNuxtPlugin(() => {
  const renderer = new MD({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  }).use(anchor, {
    slugify: s => uslug(s),
  })
  return {
    provide: {
      mdRenderer: renderer,
    },
  }
})