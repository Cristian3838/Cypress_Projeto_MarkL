const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const webpack = require('webpack');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      apiUrl: 'http://localhost:3333'
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);

      const webpackOptions = {
        // ... outras configurações do seu webpack ...
        plugins: [
          // Adiciona o ProvidePlugin para injetar 'process' onde for necessário
          new webpack.ProvidePlugin({
            process: 'process/browser', // Mapeia a variável global 'process' para o polyfill
          }),
        ],
        resolve: {
          fallback: {
            // Adiciona o fallback para os módulos que estão falhando
            "process": require.resolve("process/browser"),
            "path": require.resolve("path-browserify"), // O path também falhou
            // Adicione outros módulos que possam falhar, se necessário
            // "os": require.resolve("os-browserify/browser"),
          },
        },
      };
      
      return config;
    },
  },
});
