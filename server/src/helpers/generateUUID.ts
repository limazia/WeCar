import * as randomstring from 'randomstring'

function generateUUIDPart(): string {
  return randomstring.generate({
    length: 8,
    charset: 'hex'
  })
}

export function generateUUID(): string {
  const uuid = [
    generateUUIDPart(),
    generateUUIDPart(),
    generateUUIDPart(),
    generateUUIDPart(),
    generateUUIDPart()
  ].join('-')

  return uuid
}
