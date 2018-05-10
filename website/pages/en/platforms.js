/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + img;
}

class Platforms extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <h1>Other platforms</h1>
          <ul>
            <li>Platform 1</li>
            <li>Platform 2</li>
            <li>Platform 3</li>
          </ul>
        </Container>
      </div>
    );
  }
}

module.exports = Platforms;
