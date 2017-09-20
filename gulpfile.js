'use strict'
const gulp = require('gulp')
const settings = require('./settings/core')

gulp.task('dist-server', () => {
  require('./bin/dist-server.js')
})

gulp.task('dev', () => {
  require('./bin/dev-server')
})

gulp.task('build', () => {
  require('./bin/production')
})