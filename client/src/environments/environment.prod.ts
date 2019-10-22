export const environment = {
  production: true,
  api: {
    basepath: `http://localhost:4000`,
    routes: {
      'auth': {
        login: 'login',
        register: 'register',
      },
      'api/jobs': {
        latest: 'latest',
        visa_sponsor: 'visa-sponsor',
        remote_jobs: 'remote-jobs',
        high_salary: 'high-salary',
      }
    }
  }
};
