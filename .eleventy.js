export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/static");
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  }  