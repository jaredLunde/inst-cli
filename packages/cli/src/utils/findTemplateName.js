import memoize from 'memoize-two-args'
import {getPkgJson} from '@inst-cli/template-utils'

export default memoize((pkgDir, templateName) => {
  let pkgName = templateName

  if (templateName.startsWith('file:')) {
    // local package
    pkgName = getPkgJson(templateName.replace(/^file:/, '')).name
  } else {
    pkgName = pkgName.split('@')
    pkgName = (pkgName.length > 2 ? pkgName.slice(0, -1) : pkgName).join('@')
    pkgName = pkgName.startsWith('@') === false ? pkgName.split('@')[0] : pkgName
  }

  return pkgName
}, Map)
