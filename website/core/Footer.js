/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Network</h5>
            <a href="https://loomx.io">
              Loom Network
            </a>
            <a href="https://cryptozombies.io">
              CryptoZombies
            </a>
            <a href="https://delegatecall.com">
              DelegateCall
            </a>
            <a href="https://delegatecall.com/what-is-blockchain">
              What is Blockchain
            </a>

          </div>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('prereqs.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('loom-js-quickstart.html', this.props.language)}>
              Guides
            </a>
            {/* <a href={this.docUrl('doc3.html', this.props.language)}>
              API Reference
            </a> */}
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a
              href="http://delegatecall.com/"
              target="_blank"
              rel="noreferrer noopener">
              Message Board
            </a>
            <a href="https://t.me/LoomSDK">Chatroom</a>
            <a
              href="https://twitter.com/loomnetwork"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://medium.com/loom-network">Blog</a>
            <a href="https://github.com/loomnetwork">GitHub</a>
          </div>
          <img src={this.props.config.baseUrl + 'img/zombie-mascot.png'} className="zombie-mascot" />
        </section>

        <a
          href="https://loomx.io"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/footer-decal.svg'}
            alt="Loom Network"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
