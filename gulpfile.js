'use strict'
const gulp = require('gulp')
const rollup = require('rollup')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const ncu = require('npm-check-updates')
const minifycss = require('gulp-clean-css')
const replace = require('rollup-plugin-replace')
const autoprefixer = require('gulp-autoprefixer')
const rollupBabel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const rollupUglify = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const packageConfig = require('./package.json')

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

gulp.task('vendor', ['vendorJS', 'vendorCSS'])

gulp.task('vendorJS', () => {
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
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: './common/resource/js/core.min.js',
      sourcemap: false
    })
  })
})

gulp.task('vendorCSS', () => {
  gulp.src(['./externals/*.scss'])
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: packageConfig.browserslist,
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./common/resource/css'))
})
