require('ts-node').register()

const projectName = 'project-name'

const configs = {
  all: {
    plugins: [projectName],
  },
}

const rules = require('./index.ts').default

module.exports = { configs, rules }
