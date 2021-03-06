import {flag, log} from '@inst-cli/template-utils'
import fs from 'fs-extra'

export default function writeFile(fn, data, opt = {}) {
  opt = {mode: 0o744, debug: false, ...opt}
  const tmpFn = `${fn}.tmp`

  return new Promise((resolve, reject) =>
    fs.writeFile(tmpFn, data, opt, err => {
      if (err) {
        reject(err)
        throw new Error(err)
      }

      fs.renameSync(tmpFn, fn)
      resolve(data)

      if (opt.debug === true) {
        log(flag('write'), fn, `\n${data}`)
      }
    })
  )
}

export function writeFileSync(fn, data, opt = {}) {
  opt = {mode: 0o744, debug: false, ...opt}
  const tmpFn = `${fn}.tmp`

  fs.writeFileSync(tmpFn, data, opt)
  fs.renameSync(tmpFn, fn)

  if (opt.debug === true) {
    log(flag('write'), fn, `\n${data}`)
  }

  return data
}
