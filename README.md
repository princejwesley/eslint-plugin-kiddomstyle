[![Build Status](https://travis-ci.org/kiddom/eslint-plugin-kiddomstyle.svg?branch=master)](https://travis-ci.org/kiddom/eslint-plugin-kiddomstyle)


# eslint-plugin-kiddomstyle

This plugin enforces architectural choices within Kiddom&#39;s React-Redux code.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-kiddomstyle`:

```
$ npm install eslint-plugin-kiddomstyle --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-kiddomstyle` globally.

## Usage

Add `kiddomstyle` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "kiddomstyle"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "kiddomstyle/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





