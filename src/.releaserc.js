module.exports = {
  'branches': ['+([0-9])?(.{+([0-9]),x}).x', 'main', 'master', 'next', 'next-major', { name: 'beta', prerelease: true }, { name: 'alpha', prerelease: true }]
}
