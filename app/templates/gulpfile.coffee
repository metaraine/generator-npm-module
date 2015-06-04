gulp =         require('gulp')
gutil =        require('gulp-util')
coffee =       require('gulp-coffee')
runSequence =  require('run-sequence')
jshint =       require('gulp-jshint')
plumber =      require('gulp-plumber')
del =          require('del')
###
rename =       require('gulp-rename')
uglify =       require('gulp-uglify')
concat =       require('gulp-concat')
imagemin =     require('gulp-imagemin')
cache =        require('gulp-cache')
filter =       require('gulp-filter')
###

config =
  scriptsSrc: 'src/**/*.coffee'
  scriptsDest: 'lib'

gulp.task 'scripts', ->
  gulp.src(config.scriptsSrc)
    .pipe(plumber())
    .pipe(coffee().on('error', gutil.log))
    .pipe(gulp.dest(config.scriptsDest))

gulp.task 'clean', (cb)->
  del(['./lib'], cb)

gulp.task 'default', (callback)->

  runSequence 'clean', [
    'scripts'
  ], callback

  gulp.watch(config.scriptsSrc, ['scripts'])
