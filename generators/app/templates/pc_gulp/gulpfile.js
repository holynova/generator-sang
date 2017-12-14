const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const srcFolder = './src/';
const destFolder = './dist/';
const revFolder = './rev/';
const log = console.log;

const srcFilter = {
  less: `${srcFolder}/styles/*.less`,
  scss: `${srcFolder}/styles/*.scss`,
  css: `${srcFolder}/styles/*.css`,
  html: `${srcFolder}*.html`,
  img: `${srcFolder}images/*.*`,
  js: `${srcFolder}/scripts/*.js`,
  styles: `${srcFolder}/styles/*.{less,scss,css}`,
};

function getPath(baseFolder) {
  return {
    css: `${baseFolder}/styles`,
    img: `${baseFolder}images`,
    js: `${baseFolder}/scripts`,
    html: baseFolder,
  };
}
const destPath = getPath(destFolder);
const revPath = getPath(revFolder);


gulp.task('del', (cb) => {
  del(destFolder).then(() => {
    log('dest dir clear');
    cb();
  });
});

gulp.task('delRev', (cb) => {
  del(revFolder).then(() => {
    cb();
  });
});

gulp.task('image_md5', (cb) => {
  gulp.src(srcFilter.img)
    .pipe($.imagemin())
    .pipe($.rev())
    .pipe(gulp.dest(destPath.img))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(revPath.img))
    .on('end', cb);
});


gulp.task('replace_image_in_style', (cb) => {
  gulp.src([`${revPath.img}/*.json`, srcFilter.styles])
    // .pipe($.debug())
    .pipe($.revCollector())
    .pipe(gulp.dest(revPath.css))
    .on('end', cb);
});

gulp.task('replace_image_in_js', (cb) => {
  gulp.src([`${revPath.img}/*.json`, srcFilter.js])
    // .pipe($.debug())
    .pipe($.revCollector())
    .pipe(gulp.dest(revPath.js))
    .on('end', cb);
});


gulp.task('less_to_css', (cb) => {
  gulp.src(`${revPath.css}/*.less`)
    .pipe($.less())
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(destPath.css))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(revPath.css))
    .on('end', cb);
});
gulp.task('scss_to_css', (cb) => {
  gulp.src(`${revPath.css}/*.scss`)

    .pipe($.sass())
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(destPath.css))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(revPath.css))
    .on('end', cb);
});
gulp.task('css', (cb) => {
  gulp.src(`${revPath.css}/*.css`)
    .pipe($.csso())
    .pipe($.rev())
    .pipe(gulp.dest(destPath.css))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(revPath.css))
    .on('end', cb);
});
gulp.task('all_css', ['less_to_css', 'scss_to_css', 'css']);

gulp.task('js', (cb) => {
  gulp.src(`${revPath.js}/*.js`)
    .pipe($.debug())
    .pipe($.babel({
      presets: ['env'],
    }))
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(gulp.dest(destPath.js))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(revPath.js))
    .on('end', cb);
});

gulp.task('html', (cb) => {
  gulp.src([`${revFolder}/**/*.json`, srcFilter.html])
    .pipe($.revCollector())
    .pipe($.htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(destPath.html))
    .on('end', cb);
});

gulp.task('default', $.sequence(
  'del',
  'delRev',
  'image_md5',
  ['replace_image_in_style', 'replace_image_in_js'],
  ['all_css', 'js'],
  'html',
  'delRev',
));
