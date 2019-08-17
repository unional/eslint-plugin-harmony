const gulp = require('gulp')
const eslint = require('gulp-eslint')
const colors = require('ansi-colors')
const uniq = require('lodash.uniq')
const path = require('path')
const through = require('through')

const PluginError = require('plugin-error')

function positiveTest(config) {
  const configFile = require.resolve(`./lib/${config}`)
  return gulp.src(`spec/${config}/*.pass.*`)
    .pipe(eslint({ configFile }))
    .pipe(eslint.format())
    .pipe(eslint.results(results => {
      const count = results.errorCount;
      if (!count) {
        return;
      }

      throw new PluginError(config,
        `Failed with ${count} ${(count === 1 ? ' error' : ' errors')}`,
        { showProperties: false });
    }))
}

function errorTest(config) {
  const configFile = require.resolve(`./lib/${config}`)
  return gulp.src(`spec/${config}/*.error.*`)
    .pipe(eslint({ configFile }))
    .pipe((function () {
      let errMsg
      return through(function (file) {
        const result = file.eslint
        const filename = path.basename(result.filePath)
        const matches = /(.*)\.(\d*)\.error\.(j|t)s/.exec(filename)
        if (!matches)
          throw new Error(`Unable to process '${filename}'. Missing number of errors expected?`)
        const ruleId = matches[1]
        const errorCount = matches[2]
        const rules = result.messages.filter(m => m.ruleId === ruleId)
        if (rules.length === 0) {
          errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} did not trigger '${ruleId}'`)}`
        }
        else if (rules.length != errorCount) {
          errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} expected ${errorCount} violation of '${ruleId}' but received ${rules.length}`)}`
        }
        else {
          const unexpectedRules = uniq(result.messages.filter(m => m.ruleId !== ruleId).map(m => `'${m.ruleId}'`))
          if (unexpectedRules.length > 1)
            errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} triggered unexpected rule(s): ${unexpectedRules.join(', ')}`)}`
        }
      }, function () {
        if (errMsg) {
          this.emit('error', new PluginError(config, errMsg, { showProperties: false }));
        }
        else {
          this.emit('end');
        }
      });
    })());
}

function warnTest(config) {
  const configFile = require.resolve(`./lib/${config}`)
  return gulp.src(`spec/${config}/*.warn.*`)
    .pipe(eslint({ configFile }))
    .pipe((function () {
      let errMsg
      return through(function (file) {
        const result = file.eslint
        const filename = path.basename(result.filePath)
        const matches = /(.*)\.(\d*)\.warn\.(j|t)s/.exec(filename)
        if (!matches)
          throw new Error(`Unable to process '${filename}'. Missing number of warnings expected?`)
        const ruleId = matches[1]
        const errorCount = matches[2]
        const rules = result.messages.filter(m => m.ruleId.endsWith(ruleId))
        if (rules.length === 0) {
          errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} did not trigger '${ruleId}'`)}`
        }
        else if (rules.length != errorCount) {
          errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} expected ${errorCount} violation of '${ruleId}' but received ${rules.length}`)}`
        }
        else {
          const unexpectedRules = uniq(result.messages.filter(m => m.ruleId !== ruleId).map(m => `'${m.ruleId}'`))
          if (unexpectedRules.length > 1)
            errMsg = `[${colors.cyan(config)}] ${colors.red(`${filename} triggered unexpected rule(s): ${unexpectedRules.join(', ')}`)}`
        }
      }, function () {
        if (errMsg) {
          this.emit('error', new PluginError(config, errMsg, { showProperties: false }));
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
    const p = `${s}-pass`
    entries.push(p)
    gulp.task(p, () => positiveTest(s))

    const e = `${s}-error`
    entries.push(e)
    gulp.task(e, () => errorTest(s))

    const w = `${s}-warn`
    entries.push(w)
    gulp.task(w, () => warnTest(s))
  })
  return entries
}

const styles = Object.keys(require('./lib').configs)

gulp.task('default', gulp.parallel(buildTasks(styles)))
