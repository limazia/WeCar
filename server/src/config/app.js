module.exports = {
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  server: `${process.env.APP_URL}:${process.env.APP_PORT}`,
  locals: {
    PAGE_TITLE: process.env.APP_NAME,
  },
};