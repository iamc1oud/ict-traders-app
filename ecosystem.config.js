module.exports = {
  apps: [
    {
      name: 'gateway', 
      script: 'npm', 
      args: 'run start:dev', 
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'auth_svc', 
      script: 'npm', 
      args: 'run start:dev auth', 
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
