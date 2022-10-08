const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const fs = require('fs')
var sass = require('node-sass')

const INPUT_FILE= 'src/style.scss'
const OUTPUT_FILE= 'dest/style.postcss_nodesass.css'
const OUTPUT_FILE_MAP= 'dest/style.postcss_nodesass.css.map'

sass.render({
  file: INPUT_FILE
}, (err, result) => {
  postcss([autoprefixer, postcssNested])
    .process(result.css, { from: INPUT_FILE, to: OUTPUT_FILE })
    .then(result => {
      fs.writeFile(OUTPUT_FILE, result.css, () => true)
      if ( result.map ) {
        fs.writeFile(OUTPUT_FILE_MAP, result.map.toString(), () => true)
      }
    })
})
