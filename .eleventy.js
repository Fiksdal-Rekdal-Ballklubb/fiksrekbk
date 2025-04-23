import MarkdownIt from "markdown-it";

export default function(eleventyConfig) {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
  });

  eleventyConfig.addFilter("markdown", (value) => {
    return md.render(value || "");
  });

  eleventyConfig.addFilter("datoNorsk", (value) => {
    if (!value) return "";

    const d = new Date(value);
    const idag = new Date();

    d.setHours(0, 0, 0, 0);
    idag.setHours(0, 0, 0, 0);

    const diffMs = idag - d;
    const diffDager = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDager === 0) {
      return "i dag";
    } else if (diffDager === 1) {
      return "i går";
    } else if (diffDager > 1 && diffDager < 14) {
      return `for ${diffDager} dager sidan`;
    } else {
      const dag = String(d.getDate()).padStart(2, "0");
      const mnd = String(d.getMonth() + 1).padStart(2, "0");
      const år = d.getFullYear();
      return `${dag}.${mnd}.${år}`;
    }
  });

  eleventyConfig.addPassthroughCopy("src/static");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
}
