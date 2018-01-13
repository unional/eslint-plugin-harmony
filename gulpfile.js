const gulp = require('gulp');
const eslint = require('gulp-eslint');
// const tslint = require('tslint');
const gutil = require('gulp-util');
const uniq = require('lodash.uniq')
const path = require('path')
const through = require('through');

const PluginError = gutil.PluginError;

function positiveTest(config) {
  return gulp.src(`spec/${config}/*.pass.js`)
    .pipe(eslint({
      configFile: `${config}.json`
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function negativeTest(config) {
  return gulp.src(`spec/${config}/*.fail.js`)
    .pipe(eslint({
      configFile: `${config}.json`
    }))
    .pipe((function () {
      let errMsg
      return through(function (file) {
        const result = file.eslint
        const filename = path.basename(result.filePath)
        const ruleId = filename.slice(0, -8)
        const rule = result.messages.find(m => m.ruleId === ruleId)
        if (!rule) {
          errMsg = `[${gutil.colors.cyan(config)}] ${gutil.colors.red(`${filename} did not trigger '${ruleId}'`)}`
        }
        else {
          const unexpectedRules = uniq(result.messages.filter(m => m.ruleId !== ruleId).map(m => `'${m.ruleId}'`))
          if (unexpectedRules.length > 1)
            errMsg = `[${gutil.colors.cyan(config)}] ${gutil.colors.red(`${filename} triggered unexpected rule(s): ${unexpectedRules.join(', ')}`)}`
        }
      }, function () {
        if (errMsg) {
          this.emit('error', new PluginError('gulp-eslint', errMsg));
        } else {
          this.emit('end');
        }
      });
    })());
}

gulp.task('eslint-basic-positive', function () {
  return positiveTest('basic');
});

gulp.task('eslint-basic-negative', function () {
  return negativeTest('basic');
});

gulp.task('eslint-strict-positive', function () {
  return positiveTest('strict');
});

gulp.task('eslint-strict-negative', function () {
  return negativeTest('strict');
});

gulp.task('eslint', [
  'eslint-basic-positive',
  'eslint-basic-negative',
  'eslint-strict-positive',
  'eslint-strict-negative'
]);

gulp.task('default', ['eslint']);
