# extending-config
Configuration through demanding common config and updating it with environment-dependent part

## Installation

`npm i extending-config --save`

## Usage

Require configurator like this:

`var configurator = require("extending-config");`

And get config then using configurator. It accepts options like this:
`basePath` path to your config directory. Defaults to your cwd / 'config'
`environment` your current environment defaults to your NODE_ENV or 'development'
`common` base part of your config, defaults to 'common'. Use `false` if you don``t want to have common part of config.

Common config would be updated by environment config.

*Be careful not to use one config as base for two different environments in the same process run. They are not copied and my be mixed!*