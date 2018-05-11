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
const translate = require('../../server/translate.js').translate;

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function imgUrl(img) {
  return siteConfig.baseUrl + img;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={imgUrl(user.image)} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h1><translate>Who's Using This?</translate></h1>
      <p><translate>This project is used by all these people</translate></p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};


class Help extends React.Component {
  render() {
    let language = this.props.language || '';
    const supportLinks = [
      {
        content: `&#8226; <translate desc="followed by 'documentation on this site'">Learn more using the</translate> [<translate>documentation on this site.</translate>](${docUrl(
          'doc1.html',
          language
        )})`,
        title: '<translate>Browse Docs</translate>',
      },
      {
        content: '&#8226; <translate>Ask questions about the documentation and project: <a href="https://t.me/????">Join our SDK Telegram Room </a> <br> <br> &#8226; Ask questions on <a href="https://delegatecall.com">DelegateCall</translate></a>   ',
        title: '<translate>Join the community</translate>',
      },
      {
        content: '&#8226; <translate>Find out what\'s new with this project.</translate> <br> <translate desc="Followed by \'SDK Mailing list\'">Join our</translate> <a href=\'https://www.getdrip.com/forms/816334931/submissions/new\'><translate>SDK Mailing list</translate></a>',
        title: '<translate>Stay up to date.</translate>',
      },
    ];

    return (
      <div>
        <div className="docMainWrapper dark-bg remove-margin">
          <Container className="mainContainer documentContainer postContainer helpContainer wrapper">
            <div className="post spacer">
              <header className="postHeader headerContainer">
                <h1 className="center-text"><translate>Need help?</translate></h1>
              </header>
              <GridBlock contents={supportLinks} layout="threeColumn" />
            </div>
          </Container>
        </div>
        <div className="showcase-container">
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Help;
