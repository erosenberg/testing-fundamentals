import { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "storybook-framework-qwik",
  },

  core: {
    renderer: "storybook-framework-qwik",
  },

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  viteFinal: async (config: any) => {
    return config;
  },

  docs: {
    autodocs: true,
  },
};

export default config;
