module.exports = {
  default: {
    require: [
      'ts-node/register',
      'src/steps/*.steps.ts'
    ],
    'gherkin-parse-options': {
      tagSyntax: 'legacy'
    },
    format: ['progress', 'json:reports/cucumber_report.json'],
    'publish-quiet': true,
    'require-module': ['ts-node/register'],
    'paths': [
      'src/features/**/*.feature'
    ]
  }
};