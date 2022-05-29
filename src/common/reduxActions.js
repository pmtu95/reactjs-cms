export const request = (typeStr) => {
  return {
    type: typeStr,
  }
}

export const success = (typeStr, data) => {
  return {
    type: typeStr,
    payload: data,
  }
}

export const failure = (typeStr, err) => {
  return { type: typeStr, payload: err }
}
