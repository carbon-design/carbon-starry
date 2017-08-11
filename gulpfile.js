'use strict'
const del = require('del')
const gulp = require('gulp')
const server = require('gulp-express')
const settings = require('./settings/customize')

const rootPath = settings.build.assetsPublicPath
const distServerPath = settings.build.distServerPath
const allServerFiles = `${distServerPath}/**/*`

gulp.task('dist-server', ['clean', 'copy-files', 'server'])

gulp.task('clean', () => del.sync([allServerFiles]))

gulp.task('copy-files', () =>
  gulp.src('dist/**/*')
    .pipe(gulp.dest(distServerPath + rootPath))
)

gulp.task('server', () => {
  server.run(['bin/dist-server.js'])
  gulp.watch([allServerFiles], server.notify)
})

