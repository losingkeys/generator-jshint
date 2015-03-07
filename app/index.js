'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var JshintGenerator = yeoman.generators.Base.extend({

  askFor: function () {
    var done = this.async();

    this.log(yosay('Welcome to the JSHint configuration generator!'));

    // {{{ prompts

    var prompts = [
      {
        name: 'maxerr',
        message: 'Maximum error before stopping',
        type: 'input',
        default: 50,
        validate: function(input) {
          if (isNaN(parseInt(input)))
            return '"maxerr" must be a number';

          return true;
        }
      },
      {
        name: 'curly',
        message: 'Require {} for every new block or scope',
        type: 'confirm',
        default: true
      },
      {
        name: 'eqeqeq',
        message: 'Require triple equals (===) for comparison',
        type: 'confirm',
        default: true
      },
      {
        name: 'forin',
        message: 'Require filtering for..in loops with obj.hasOwnProperty()',
        type: 'confirm',
        default: true
      },
      {
        name: 'immed',
        message: 'Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`',
        type: 'confirm',
        default: false
      },
      {
        name: 'indent',
        message: 'Number of spaces to use for indentation',
        type: 'input',
        default: 4,
        validate: function(input) {
          if (isNaN(parseInt(input)))
            return '"indent" must be a number';

          return true;
        }
      },
      {
        name: 'latedef',
        message: 'Require variables/functions to be defined before being used',
        type: 'confirm',
        default: false
      },
      {
        name: 'newcap',
        message: 'Require capitalization of all constructor functions e.g. `new F()`',
        type: 'confirm',
        default: false
      },
      {
        name: 'noarg',
        message: 'Prohibit use of `arguments.caller` and `arguments.callee`',
        type: 'confirm',
        default: true
      },
      {
        name: 'noempty',
        message: 'Prohibit use of empty blocks',
        type: 'confirm',
        default: true
      },
      {
        name: 'nonew',
        message: 'Prohibit use of constructors for side-effects (without assignment)',
        type: 'confirm',
        default: false
      },
      {
        name: 'plusplus',
        message: 'Prohibit use of `++` & `--`',
        type: 'confirm',
        default: false
      },
      {
        name: 'bitwise',
        message: 'Prohibit bitwise operators (&, |, ^, etc.)',
        type: 'confirm',
        default: true
      },
      {
        name: 'camelcase',
        message: 'Identifiers must be in camelCase',
        type: 'confirm',
        default: false
      },
      {
        name: 'quotmark',
        message: 'Quotation mark consistency',
        type: 'list',
        default: false,
        choices: [
          {
            name: 'false; do nothing (default)',
            checked: true
          },
          {
            name: 'true; ensure whatever is used is consistent',
            checked: false
          },
          {
            name: 'single; require single quotes',
            checked: false
          },
          {
            name: 'double; require double quotes',
            checked: false
          }
       ],
        validate: function(input) {
          if (isNaN(parseInt(input))) {
            return '\'quotmark\' must be a number';
          }

          return true;
        }
      },
      {
        name: 'undef',
        message: 'Require all non-global variables to be declared (prevents global leaks)',
        type: 'confirm',
        default: true
      },
      {
        name: 'unused',
        message: 'Require all defined variables be used',
        type: 'confirm',
        default: true
      },
      {
        name: 'strict',
        message: 'Requires all functions run in ES5 Strict Mode',
        type: 'confirm',
        default: true
      },
      {
        name: 'maxparams',
        message: 'Max number of formal params allowed per function (positive number, or false for no limit)',
        type: 'input',
        default: false,
        validate: function(input) {
          if (input === false || // ok if they hit enter (the default is false)
              input.trim() === 'false' || // ok if they typed 'false'
              (!isNaN(parseInt(input)) && parseInt(input) > 0)) { // ok if they typed positive a number
            return true;
          }

          return 'Please enter either a positive number, or false for no limit';
        }
      },
      {
        name: 'maxdepth',
        message: 'Max depth of nested blocks (within functions; positive number, or false for no limit)',
        type: 'input',
        default: false,
        validate: function(input) {
          if (input === false || // ok if they hit enter (the default is false)
              input.trim() === 'false' || // ok if they typed 'false'
              (!isNaN(parseInt(input)) && parseInt(input) > 0)) { // ok if they typed positive a number
            return true;
          }

          return 'Please enter either a positive number, or false for no limit';
        }
      },
      {
        name: 'maxstatements',
        message: 'Max number statements per function (positive number, or false for no limit)',
        type: 'input',
        default: false,
        validate: function(input) {
          if (input === false || // ok if they hit enter (the default is false)
              input.trim() === 'false' || // ok if they typed 'false'
              (!isNaN(parseInt(input)) && parseInt(input) > 0)) { // ok if they typed positive a number
            return true;
          }

          return 'Please enter either a positive number, or false for no limit';
        }
      },
      {
        name: 'maxcomplexity',
        message: 'Max cyclomatic complexity per function (positive number, or false for no limit)',
        type: 'input',
        default: false,
        validate: function(input) {
          if (input === false || // ok if they hit enter (the default is false)
              input.trim() === 'false' || // ok if they typed 'false'
              (!isNaN(parseInt(input)) && parseInt(input) > 0)) { // ok if they typed positive a number
            return true;
          }

          return 'Please enter either a positive number, or false for no limit';
        }
      },
      {
        name: 'maxlen',
        message: 'Max number of characters per line (positive number, or false for no limit)',
        type: 'input',
        default: false,
        validate: function(input) {
          if (input === false || // ok if they hit enter (the default is false)
              input.trim() === 'false' || // ok if they typed 'false'
              (!isNaN(parseInt(input)) && parseInt(input) > 0)) { // ok if they typed positive a number
            return true;
          }

          return 'Please enter either a positive number, or false for no limit';
        }
      },
      {
        name: 'asi',
        message: 'Tolerate Automatic Semicolon Insertion (no semicolons)',
        type: 'confirm',
        default: false
      },
      {
        name: 'boss',
        message: 'Tolerate assignments where comparisons would be expected',
        type: 'confirm',
        default: false
      },
      {
        name: 'debug',
        message: 'Allow debugger statements e.g. browser breakpoints.',
        type: 'confirm',
        default: false
      },
      {
        name: 'eqnull',
        message: 'Tolerate use of `== null`',
        type: 'confirm',
        default: false
      },
      {
        name: 'es5',
        message: 'Allow ES5 syntax (ex: getters and setters)',
        type: 'confirm',
        default: false
      },
      {
        name: 'esnext',
        message: 'Allow ES.next (ES6) syntax (ex: `const`)',
        type: 'confirm',
        default: false
      },
      {
        name: 'moz',
        message: 'Allow Mozilla specific syntax (extends and overrides esnext features) (ex: `for each`, multiple try/catch, function expression...)',
        type: 'confirm',
        default: false
      },
      {
        name: 'evil',
        message: 'Tolerate use of `eval` and `new Function()`',
        type: 'confirm',
        default: false
      },
      {
        name: 'expr',
        message: 'Tolerate `ExpressionStatement` as Programs',
        type: 'confirm',
        default: false
      },
      {
        name: 'funcscope',
        message: 'Tolerate defining variables inside control statements',
        type: 'confirm',
        default: false
      },
      {
        name: 'globalstrict',
        message: 'Allow global "use strict" (also enables \'strict\')',
        type: 'confirm',
        default: false
      },
      {
        name: 'iterator',
        message: 'Tolerate using the `__iterator__` property',
        type: 'confirm',
        default: false
      },
      {
        name: 'lastsemic',
        message: 'Tolerate omitting a semicolon for the last statement of a 1-line block',
        type: 'confirm',
        default: false
      },
      {
        name: 'laxbreak',
        message: 'Tolerate possibly unsafe line breakings',
        type: 'confirm',
        default: false
      },
      {
        name: 'laxcomma',
        message: 'Tolerate comma-first style coding',
        type: 'confirm',
        default: false
      },
      {
        name: 'loopfunc',
        message: 'Tolerate functions being defined in loops',
        type: 'confirm',
        default: false
      },
      {
        name: 'multistr',
        message: 'Tolerate multi-line strings',
        type: 'confirm',
        default: false
      },
      {
        name: 'proto',
        message: 'Tolerate using the `__proto__` property',
        type: 'confirm',
        default: false
      },
      {
        name: 'scripturl',
        message: 'Tolerate script-targeted URLs',
        type: 'confirm',
        default: false
      },
      {
        name: 'shadow',
        message: 'Allows re-define variables later in code e.g. `var x=1; x=2;`',
        type: 'confirm',
        default: false
      },
      {
        name: 'sub',
        message: 'Tolerate using `[]` notation when it can still be expressed in dot notation',
        type: 'confirm',
        default: false
      },
      {
        name: 'supernew',
        message: 'Tolerate `new function () { ... };` and `new Object;`',
        type: 'confirm',
        default: false
      },
      {
        name: 'validthis',
        message: 'Tolerate using this in a non-constructor function',
        type: 'confirm',
        default: false
      },
      {
        name: 'environments',
        message: 'These options let JSHint know about some pre-defined global variables',
        type: 'checkbox',
        choices: [
          {
            name: 'browser',
            message: 'Web Browser (window, document, etc)',
            checked: true
          },
          {
            name: 'couch',
            message: 'CouchDB',
            checked: false
          },
          {
            name: 'devel',
            message: 'Development/debugging (alert, confirm, etc)',
            checked: true
          },
          {
            name: 'dojo',
            message: 'Dojo Toolkit',
            checked: false
          },
          {
            name: 'jquery',
            message: 'jQuery',
            checked: false
          },
          {
            name: 'mootools',
            message: 'MooTools',
            checked: false
          },
          {
            name: 'node',
            message: 'Node.js',
            checked: false
          },
          {
            name: 'nonstandard',
            message: 'Widely adopted globals (escape, unescape, etc)',
            checked: false
          },
          {
            name: 'prototypejs',
            message: 'Prototype and Scriptaculous',
            checked: false
          },
          {
            name: 'rhino',
            message: 'Rhino',
            checked: false
          },
          {
            name: 'worker',
            message: 'Web Workers',
            checked: false
          },
          {
            name: 'wsh',
            message: 'Windows Scripting Host',
            checked: false
          },
          {
            name: 'yui',
            message: 'Yahoo User Interface',
            checked: false
          }
        ]
      },
      {
        name: 'globals',
        message: 'Additional predefined global variables (e.g. {"SomeGlobal": true})',
        type: 'input',
        default: '{}',
        validate: function(input) {
          try {
            var globals = JSON.parse(input);

            for (var name in globals) {
              if (globals.hasOwnProperty(name)) {
                if (typeof globals[name] !== 'boolean')
                  return 'Please enter a JSON object with only boolean ' +
                    'values to indicate which globals are or are not allowed';
              }
            }
          } catch(e) {
            return 'Please enter a valid JSON object';
          }

          return true;
        }
      }
    ];

    // prompts }}}

    this.prompt(prompts, function (props) {
      for (var property in props) {
        if (props.hasOwnProperty(property)) {
          this._setJshintOption(property, props[property]);
        }
      }

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.template('_jshintrc', '.jshintrc');
  },

  // stores a JSHint option for later
  _setJshintOption: function (property, value) {
    if (typeof this.jshintOptions === 'undefined')
      this.jshintOptions = {};

    switch (property) {
      case 'environments': this._setJshintEnvironmentOptions(value); break;

      case 'quotmark':     this._setJshintQuotmarkOption(value);     break;

      case 'maxparams': case 'maxdepth': case 'maxstatements':
      case 'maxcomplexity': case 'maxlen':
        this._setJshintMaxOrFalseValue(property, value);
      break;

      // all other properties can be set directly
      default: this.jshintOptions[property] = value.toString();
    }
  },

  _setJshintEnvironmentOptions: function (environments) {
    // environments is a list of separate boolean options that each get set
    // individually in the .jshintrc, but it seemed less confusing to make it a
    // list of checkboxes because they all do the same thing (allow certain
    // global variables)
    var allEnvironments = {
      browser: false,
      couch: false,
      devel: false,
      dojo: false,
      jquery: false,
      mootools: false,
      node: false,
      nonstandard: false,
      prototypejs: false,
      rhino: false,
      worker: false,
      wsh: false,
      yui: false
    };

    // toggle any environments the user chose
    for (var index in environments) {
      if (environments.hasOwnProperty(environmentName)) {
        var name = environments[index];

          allEnvironments[name] = true;
      }
    }

    for (var environmentName in allEnvironments) {
      if (allEnvironments.hasOwnProperty(environmentName)) {
        this.jshintOptions[environmentName] = allEnvironments[environmentName];
      }
    }
  },

  _setJshintQuotmarkOption: function (value) {
    // the 'quotmark' option value choices have extra text in them explaining
    // to the user what they do. Remove this extra text.
    //
    // Also: the possible options for 'quotmark' are
    // true/false/'single'/'double'. Add quotes around the strings
    this.jshintOptions.quotmark = value.split(';', 1)[0];

    switch (this.jshintOptions.quotmark) {
      case 'single': case 'double':
        this.jshintOptions.quotmark = '"' + this.jshintOptions.quotmark + '"';
    }
  },

  _setJshintMaxOrFalseValue: function(property, value) {
    var max = parseInt(value);

    // assume false if the max value isn't an integer
    if (isNaN(max))
      this.jshintOptions[property] = false;
    else
      this.jshintOptions[property] = max;
  }
});

module.exports = JshintGenerator;
