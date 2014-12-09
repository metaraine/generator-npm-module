'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var compact = require('lodash.compact');
var camelize = require('camelize');

var NpmModuleGenerator = yeoman.generators.Base.extend({
  init: function () {

    // set instance variables for templating
    this.pkg = require('../package.json');
    this.username = 'metaraine';
    this.camelize = camelize;

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous NpmModule generator!'));

    var prompts = [{
      type: 'text',
      name: 'project',
      message: 'project name',
      default: path.basename(this.env.cwd)
    },{
      type: 'text',
      name: 'description',
      message: 'project description'
    },{
      type: 'text',
      name: 'keywords',
      message: 'keywords (comma-separated)'
    }];

    this.prompt(prompts, function (props) {
      // convert the keywords string into an array
      props.keywords = compact( // remove empty values
        props.keywords.split(',')
        .map(function(s) { return s.trim(); }) // trim
      );

      // prettify the keywords to display each one on a separate line with correct indentation in the package.json
      props.prettyKeywords = JSON.stringify(props.keywords)
        .replace(/([[,])/g, '$1\n    ') // add '    \n' after each item
        .replace(/]/g, '\n  ]') // add a newline before the closing ]

      // assign props to instance for use in templating
      this.props = props;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_gitattributes', '.gitattributes');
    this.copy('_gitignore', '.gitignore');
    this.copy('_jshintrc', '.jshintrc');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('_package.json', 'package.json');
    this.copy('index.js', 'index.js');
    this.copy('license', 'license');
    this.copy('readme.md', 'readme.md');
    this.directory('test', 'test');
  }
});

module.exports = NpmModuleGenerator;
