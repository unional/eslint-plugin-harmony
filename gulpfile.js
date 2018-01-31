const gulp = require('gulp');
const eslint = require('gulp-eslint');
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
  return gulp.src(`spec/${config}/*.error.js`)
    .pipe(eslint({
      configFile: `${config}.json`
    }))
    .pipe((function () {
      let errMsg
      return through(function (file) {
        const result = file.eslint
        const filename = path.basename(result.filePath)
        const matches = /(.*)\.(\d*)\.error\.js/.exec(filename)
        const ruleId = matches[1]
        const errorCount = matches[2]
        const rules = result.messages.filter(m => m.ruleId === ruleId)
        if (rules.length === 0) {
          errMsg = `[${gutil.colors.cyan(config)}] ${gutil.colors.red(`${filename} did not trigger '${ruleId}'`)}`
        }
        else if (rules.length != errorCount) {
            errMsg = `[${gutil.colors.cyan(config)}] ${gutil.colors.red(`${filename} expected ${errorCount} violation of '${ruleId}' but received ${rules.length}`)}`
        }
        else {
          const unexpectedRules = uniq(result.messages.filter(m => m.ruleId !== ruleId).map(m => `'${m.ruleId}'`))
          if (unexpectedRules.length > 1)
            errMsg = `[${gutil.colors.cyan(config)}] ${gutil.colors.red(`${filename} triggered unexpected rule(s): ${unexpectedRules.join(', ')}`)}`
        }
      }, function () {
        if (errMsg) {
          this.emit('error', new PluginError('gulp-eslint', errMsg));
        }
        else {
          this.emit('end');
        }
      });
    })());
}

function buildTasks(styles) {
  const entries = []
  styles.forEach(s => {
    const p = `eslint-${s}-positive`
    entries.push(p)
    gulp.task(p, () => positiveTest(s))

    const n = `eslint-${s}-negative`
    entries.push(n)
    gulp.task(n, () => negativeTest(s))
  })
  return entries
}
gulp.task('eslint', buildTasks(['default', 'strict']));

gulp.task('default', ['eslint']);
