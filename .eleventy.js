
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addWatchTarget("src/images");

  eleventyConfig.addFilter("date", (dateObj, format = "YYYY-MM-DD HH:mm") => {
    const date = new Date(dateObj);

    const pad = (n) => String(n).padStart(2, "0");

    const monthsShort = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const map = {
      YYYY: date.getUTCFullYear(),
      MM: pad(date.getUTCMonth() + 1),
      MMM: monthsShort[date.getUTCMonth()],
      DD: pad(date.getUTCDate()),
      HH: pad(date.getUTCHours()),
      mm: pad(date.getUTCMinutes()),
      ss: pad(date.getUTCSeconds()),
      T: "T",
      Z: "Z"
    };

    return format.replace(/YYYY|MMM|MM|DD|HH|mm|ss|T|Z/g, (token) => map[token]);
  });

  eleventyConfig.addShortcode("version", function() {
    return String(Date.now());
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addCollection("releases", function (collectionApi) {
    return collectionApi.getFilteredByTag("release")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi.getFilteredByTag("article")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addCollection("featuredPosts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post")
      .filter(p => p.data.featured)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("latestPosts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  });

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: data => {
      if (data.tags?.includes("post")) {
        const slug = data.slug || data.page.fileSlug;
        return `/posts/${slug}/`;
      }
      return data.permalink;
    }
  });


  // Markdown external links in new tab
  let markdownLibrary = markdownIt({ html: true });
  const defaultRender = markdownLibrary.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  markdownLibrary.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');

    if (hrefIndex >= 0) {
      const href = tokens[idx].attrs[hrefIndex][1];

      if (href.startsWith('http://') || href.startsWith('https://')) {
        tokens[idx].attrSet('target', '_blank');
        tokens[idx].attrSet('rel', 'noopener noreferrer');
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    }
  };
};