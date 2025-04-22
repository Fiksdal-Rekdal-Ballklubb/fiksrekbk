import MarkdownIt from "markdown-it";

export default function(eleventyConfig) {
  const md = new MarkdownIt({
    html: false,       // ❌ ingen rå HTML tillates
    linkify: true,     // 🔗 gjør lenker klikkbare
    breaks: true       // ↵ tolker linjeskift som <br>
  });

  eleventyConfig.addFilter("markdown", (value) => {
    return md.render(value || "");
  });

  eleventyConfig.addPassthroughCopy("src/static");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
}