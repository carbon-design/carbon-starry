'use strict'
const gulp = require('gulp')
const rollup = require('rollup')
const ncu = require('npm-check-updates')
const replace = require('rollup-plugin-replace')
const rollupBabel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const rollupUglify = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')

gulp.task('dist-server', () => {
  require('./bin/dist-server.js')
})

gulp.task('dev', () => {
  require('./bin/dev-server')
})

gulp.task('build', () => {
  require('./bin/production')
})

gulp.task('ncu', () => {
  ncu.run({
    packageFile: 'package.json',
    silent: true,
    jsonUpgraded: true
  }).then(upgraded => {
    console.log('dependencies to upgrade: \n', upgraded)
  })
})

gulp.task('vendor', () => {
  rollup.rollup({
    input: './externals/core.js',
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      rollupBabel({
        exclude: 'node_modules/**',
        plugins: ['transform-runtime', 'external-helpers'],

        runtimeHelpers: true,
        externalHelpers: true
      }),
      replace({
        exclude: 'node_modules/**',
        ENVIRONMENT: JSON.stringify('production')
      }),
      rollupUglify()
    ]
  }).then(bundle =>
    bundle.write({
      format: 'cjs',
      name: 'main',
      file: './externals/core.min.js',
      sourcemap: false
    })
  )
})
