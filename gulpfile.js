'use strict'
const gulp = require('gulp')
const server = require('gulp-express')
const settings = require('./settings/customize')

gulp.task('dist-server', () => {
  server.run(['bin/dist-server.js'])
  gulp.watch([`${settings.build.distServerPath}/**/*`], server.notify)
})
