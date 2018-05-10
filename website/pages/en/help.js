/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

class Help extends React.Component {
  render() {
    let language = this.props.language || '';
    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site.](${docUrl(
          'doc1.html',
          language
        )})`,
        title: 'Browse Docs',
      },
      {
        content: 'Ask questions about the documentation and project <br> Ask questions on <a href="https://t.me/????">Join our SDK Telegram Room </a>   <br>  <a href="https://delegatecall.com">DelegateCall</a>   ',
        title: 'Join the community',
      },
      {
        content: "Find out what's new with this project. <br> Join our <a href='https://www.getdrip.com/forms/816334931/submissions/new'>SDK Mailing list</a>",
        title: 'Stay up to date. ',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
