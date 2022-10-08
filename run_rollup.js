const { rollup } = require('rollup')
const scss = require('rollup-plugin-postcss')

const inputOptions= {
  input: 'src/index.js',
  plugins: [
    scss()
  ]
}

const outputOptionsList= [
  {
    file: 'rollup.js'
  }
]


async function rollupBuild() {
  let bundle

  try {
    // create a bundle
    const bundle = await rollup(inputOptions)

    for (const outputOptions of outputOptionsList) {
      await bundle.write(outputOptions)
    }

  } catch (error) {
    console.error(error)
  }

  if (bundle) {
    // closes the bundle
    await bundle.close()
  }
}

rollupBuild()