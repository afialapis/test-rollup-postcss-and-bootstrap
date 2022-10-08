const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const fs = require('fs')

const INPUT_FILE= 'src/style.scss'
const OUTPUT_FILE= 'dest/style.postcss.css'
const OUTPUT_FILE_MAP= 'dest/style.postcss.css.map'


fs.readFile(INPUT_FILE, (err, css) => {
  postcss([autoprefixer, postcssNested])
    .process(css, { from: INPUT_FILE, to: OUTPUT_FILE })
    .then(result => {
      fs.writeFile(OUTPUT_FILE, result.css, () => true)
      if ( result.map ) {
        fs.writeFile(OUTPUT_FILE_MAP, result.map.toString(), () => true)
      }
    })
})
