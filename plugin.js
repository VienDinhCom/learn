var stylelint = require("stylelint")
const extractCssClasses = require('css-selector-classes');
const normalizeSelector = require('normalize-selector');

var ruleName = 'plugin/stylelint-bem-namics';
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
})

module.exports = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptionObject) {

  return function (root, result) {
    
    root.walkRules((rule) => {

      rule.selectors.forEach((selector, resolvedSelector) => {

        selector = normalizeSelector(selector);

        if (selector.indexOf('#') >= 0) {
          stylelint.utils.report({
            ruleName,
            result,
            node: rule,
            message: 'Do not use ID to define the selector.',
          });
        }

      });

    });

    // ... some logic ...
    // stylelint.utils.report({});
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages