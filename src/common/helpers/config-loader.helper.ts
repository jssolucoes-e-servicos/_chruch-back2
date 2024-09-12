export const configLoaderHelper = () => {
  return {
    application: {
      name: process.env.APP_NAME,
      version: process.env.VERSION,
      port: parseInt(process.env.PORT),
      enviroment: process.env.NODE_ENV,
    },
    database: {
      url: process.env.DATABASE_URL,
    },
    jtw: {
      secret: process.env.JWT_SECRET,
    },
    redis: {
      url: process.env.REDIS_URL,
      port: parseInt(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      database: parseInt(process.env.REDIS_DATABASE),
    },
    mail: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      mail: process.env.EMAIL_MAIL,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
    sentry: {
      dns: process.env.SENTRY_DNS,
      debug: process.env.NODE_ENV === "development" ? true : false,
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    },
    efipay: {
      mode: process.env.EFIPAY_MODE,
      debug: process.env.EFIPAY_DEBUG,
      pixKey: process.env.EFIPAY_DEFAULT_KEY_PIX,
      sandbox: {
        clientId: process.env.EFIPAY_SANDBOX_CLIENT_ID,
        clientSecret: process.env.EFIPAY_SANDBOX_SECRET,
        certificateName: process.env.EFIPAY_SANDBOX_CERTIFICATE_NAME,
      },
      production: {
        clientId: process.env.EFIPAY_PRODUCTION_CLIENT_ID,
        clientSecret: process.env.EFIPAY_PRODUCTION_SECRET,
        certificateName: process.env.EFIPAY_PRODUCTION_CERTIFICATE_NAME,
      },
    },
    aws: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
    },
  };
};
