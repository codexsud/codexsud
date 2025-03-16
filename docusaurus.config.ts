import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Code x SUD",
  tagline: "A site by SUD",
  favicon: "img/favicon.ico",
  url: "https://codexsud.com/",
  baseUrl: "/",
  organizationName: "codexsud",
  projectName: "codexsud",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    function tailwindPlugin(context, options) {
      return {
        name: "tailwind-plugin",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
          ];
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Code x SUD",
      logo: {
        alt: "codexsud",
        src: "img/logo.svg",
      },
      items: [
        { to: "/dsa", label: "DSA", position: "left" },
        { to: "/sql", label: "SQL", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "systemDesign",
          position: "left",
          label: "System Design",
        },
        {
          type: "docSidebar",
          sidebarId: "reference",
          position: "left",
          label: "Reference",
        },
        { to: "/blog", label: "Blog", position: "right" },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
