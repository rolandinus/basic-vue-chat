import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble' // Transpile/polyfill with reasonable browser support

export default {
  input: 'src/wrapper.js', // Path relative to package.json
  output: {
    name: 'BasicVueChat',
    exports: 'named'
  },
  plugins: [
     commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true // Explicitly convert template to render function
    }),
    buble({
      objectAssign: 'Object.assign'
    }) // Transpile to ES5
  ]
}
