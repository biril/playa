'use strict';

var React = require('react');
var cn = require('./logo.scss.json');

var IMG_URL = 'url(data:image/svg+xml;base64,' +
  'PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodH' +
  'RwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAg' +
  'MTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PH' +
  'BhdGggZD0iTTQ5LjU3Miw2NkgzNS43NzljMS45MzQtMywzLjEyMS01LjQzMywzLjEyMS04LjczOWMwLTcuNDMtNS45OTIt' +
  'MTMuNTg0LTEzLjQyMi0xMy41ODRzLTEzLjQ4NCw2LjIxNy0xMy40ODQsMTMuNjQ3ICAgQzExLjk5NCw2NC42NTgsMTcuNz' +
  'k5LDcxLDI1LjEwNCw3MWgyNC40NjloMjQuNDY5YzcuMzA1LDAsMTMuMTA5LTYuMzI0LDEzLjEwOS0xMy42NThjMC03LjQz' +
  'LTYuMDU1LTEzLjY2NS0xMy40ODQtMTMuNjY1ICAgcy0xMy40MjIsNi4xMzYtMTMuNDIyLDEzLjU2NWMwLDMuMzA3LDEuMT' +
  'g4LDUuNzU4LDMuMTIxLDguNzU4SDQ5LjU3MnogTTI1LjcyOSw2NmgtMC41Yy00LjY4LDAtOC40MjYtNC4wMTctOC40MjYt' +
  'OC42OTggICBjMC00Ljc0NCwzLjg2Ny04LjczNSw4LjY3Ni04LjczNWM0Ljc0MiwwLDguNjEzLDMuOTMyLDguNjEzLDguNj' +
  'c2QzM0LjA5Miw2MS45MjQsMzAuMzQ2LDY2LDI1LjcyOSw2NnogTTczLjY2Niw0OC42MDIgICBjNC44MDksMCw4LjY3Niwz' +
  'Ljk1Niw4LjY3Niw4LjdjMCw0LjY4Mi0zLjc0Niw4LjY5OC04LjQyNiw4LjY5OGgtMC41Yy00LjYxNywwLTguMzYzLTQuMD' +
  'U4LTguMzYzLTguNzM5ICAgQzY1LjA1Myw1Mi41MTcsNjguOTI0LDQ4LjYwMiw3My42NjYsNDguNjAyeiIvPjxwYXRoIGQ9' +
  'Ik05MC4zOTYsMThIOC43NDhDNC4zODEsMTgsMSwyMS42MTUsMSwyNi4wNDh2NDguMDY1QzEsNzguNTQ1LDQuMzgxLDgyLD' +
  'guNzQ4LDgyaDgxLjY0OEM5NC43NjQsODIsOTksNzguNTQ1LDk5LDc0LjExMyAgIFYyNi4wNDhDOTksMjEuNjE1LDk0Ljc2' +
  'NCwxOCw5MC4zOTYsMTh6IE05NCw3NC4xMTNDOTQsNzUuODYxLDkyLjA4LDc3LDkwLjM5Niw3N0g4Ljc0OEM3LjA2NCw3Ny' +
  'w2LDc1Ljg2MSw2LDc0LjExM1YzOWg4OFY3NC4xMTN6ICAgIE05NCwzNEg2di03Ljk1MkM2LDIzLjI2Nyw4LjgxMSwyMyw4' +
  'LjgxMSwyM2g4MS41MjNjMCwwLDMuNjY2LDAuMjY3LDMuNjY2LDMuMDQ4VjM0eiIvPjwvZz48L3N2Zz4=)';

var Logo = function() {
  return <div className={cn.logo} style={{backgroundImage: IMG_URL}} />;
};

module.exports = Logo;