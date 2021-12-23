const { buildSync } = require('esbuild')

// Server Side Rendering
buildSync({
    entryPoints: ['./packages/roleplay/index.js'],
    minify: true,
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'es2020',
    outfile: './packages/dist/build/index.js'
})