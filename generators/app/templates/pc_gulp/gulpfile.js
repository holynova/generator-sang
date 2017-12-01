const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const srcPath = './src/';
const destPath = './dest/';
const revPath = './rev/';
const version = '1.1.0';

const log = console.log;


const filter = {
  less: `${srcPath}/styles/*.less`,
  scss: `${srcPath}/styles/*.scss`,
  css: `${srcPath}/styles/*.css`,
  html: `${srcPath}*.html`,
  img: `${srcPath}images/*.*`,
  js: `${srcPath}/scripts/*.js`,
};


gulp.task('del', (cb) => {
  del(destPath).then(() => {
    log('dest dir clear');
    cb();
  });
});
gulp.task('js', (cb) => {
  gulp.src(filter.js)
    .pipe($.debug())
    .pipe($.babel({ presets: ['env'] }))
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(gulp.dest(`${destPath}/js`))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(`${revPath}/js`))
    .on('end', cb);
});

gulp.task('less', (cb) => {
  gulp.src(filter.less)
    .pipe($.less())
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(`${destPath}/css`))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(`${revPath}/less`))
    .on('end', cb);
});
gulp.task('scss', (cb) => {
  gulp.src(filter.less)
    .pipe($.sass())
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(`${destPath}/css`))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(`${revPath}/less`))
    .on('end', cb);
});
gulp.task('css', (cb) => {
  gulp.src(filter.css)
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(`${destPath}/css`))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(`${revPath}/css`))
    .on('end', cb);
});

gulp.task('image', (cb) => {
  gulp.src(filter.img)
    .pipe($.imagemin())
    .pipe($.rev())
    .pipe(gulp.dest(`${destPath}/imgs`))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(`${revPath}/imgs`))
    .on('end', cb);
});

gulp.task('html', (cb) => {
  gulp.src([`${revPath}/**/*.json`, filter.html])
    .pipe($.revCollector())
    .pipe($.htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(destPath))
    .on('end', cb);
});
gulp.task('delRev', (cb) => {
  del(revPath).then(() => {
    cb();
  });
});

gulp.task('watch', () => {
  gulp.watch([filter.less, filter.html, filter.img], ['debug']);
  log('watching...');
  // content
});

gulp.task('default', $.sequence('del', 'less', 'scss', 'css', 'js', 'html', 'delRev'));
