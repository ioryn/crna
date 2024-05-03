// imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

const configCssExtension = require("./src/config/cssExtension");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

const filterPostDate = require("./src/config/postDate");

module.exports = function (eleventyConfig) {
    // EXTENSIONS - Recognising non-default languages as templates
    // Setting up CSS files to be recognised as a template language, and can be passed through eleventy. This allows our minifier to read CSS files and minify them
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCssExtension);

    // PLUGINS - Adds additional eleventy functionality
    // Sets up the eleventy navigation plugin for a scalable navigation as used in _includes/components/header.html
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    // Automatically generate a sitemap, using the domain in _data/client.json
    eleventyConfig.addPlugin(pluginSitemap, configSitemap);

    // Define the events collection
    eleventyConfig.addCollection("events", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/events/*.md");
    });

    // Define the blog collection
    eleventyConfig.addCollection("blog", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/blog/*.md");
    });

    // Define the jobs collection
    eleventyConfig.addCollection("jobs", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/jobs/*.md");
    });

    // Define the resources collection
    eleventyConfig.addCollection("resources", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/resources/*.md");
    });

    // PASSTHROUGHS - "Pass through" source files to /public, without being processed by eleventy
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

    // FILTERS
    eleventyConfig.addFilter("postDate", filterPostDate);    

    // SHORTCODES
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addShortcode("youtube", (videoURL, title) => {
        const url = new URL(videoURL);
        const id = url.searchParams.get("v");
        return `<iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${title ? ` for ${title}` : ""}" frameborder="0" allowfullscreen></iframe>`;
    });

    // SERVER
    eleventyConfig.setServerOptions(configServer);

    // Return configuration for Eleventy
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
