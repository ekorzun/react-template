const gulp = require('gulp')

gulp.task('build', ['version'])
	.task('version', () => {
		const fs = require('fs')
		const package = require('./package.json')
		const v = package.version.split('.')

		package.version = (v.push(Number(v.pop()) + 1), v).join('.')
		fs.writeFileSync('./package.json', JSON.stringify(package, null, '\t'))
	})