module.exports = {
  apps: [
    {
      name: 'portfolio-augie-static',
      script: 'npx',
      args: 'serve out -l 3000',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
