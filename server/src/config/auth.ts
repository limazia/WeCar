export const auth = {
  jwt: {
    secret: process.env.JWT_TOKEN || 'QmxhQkNoYXQ==',
    expiresIn: '7d',
    refreshExpiresIn: '7d',
  }
}
