module.exports = {
  apps: [
    {
       name: "diag",
      script: "./diagram/.svelte-kit/output/server",
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
   
  ],
};
