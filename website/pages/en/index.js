/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');
const translate = require('../../server/translate.js').translate;


function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function userImgUrl(img) {
  return siteConfig.baseUrl + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html', language)}>Example Link</Button>
            <Button href={docUrl('doc2.html', language)}>Example Link 2</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

// const Features = props => (
//   <div className="features-container">
//     <Block layout="fourColumn">
//       {[
//         {
//           content: 'This is the content of my feature. This is another description of how this project is useful',
//           image: imgUrl('artifact-1.svg'),
//           imageAlign: 'top',
//           title: 'Feature One',
//         },
//         {
//           content: 'The content of my second feature. This is another description of how this project is useful',
//           image: imgUrl('artifact-2.svg'),
//           imageAlign: 'top',
//           title: 'Feature Two',
//         },
//         {
//           content: 'The content of my third feature. This is another description of how this project is useful',
//           image: imgUrl('artifact-3.svg'),
//           imageAlign: 'top',
//           title: 'Feature Three',
//         },
//       ]}
//     </Block>
//   </div>
// );

const Features = props => (
  <div className="wrapper">
    <div className="features-container">
      <div className="feature-element">
        <div className="feature-element-content">
          <img src={imgUrl("js-zombie.png")} />
        </div>
        <hr />
        <div className="feature-element-content">
          <h3>
            Javascript
          </h3>
          <a className="feature-btn" href={docUrl('phaser-sdk-demo-websocket.html', props.language)}>
            <translate>
              Read More
            </translate>
          </a>
        </div>
      </div>
      <div className="feature-element">
        <div className="feature-element-content">
          <img src={imgUrl("phaser-zombie.png")} />
        </div>
        <hr />
        <div className="feature-element-content">
          <h3>            
            Phaser
          </h3>
          <a className="feature-btn" href={docUrl('phaser-sdk-demo.html', props.language)}>
            <translate>
              Read More
            </translate>
          </a>
        </div>
      </div>
      <div className="feature-element">
        <div className="feature-element-content">
          <img src={imgUrl("gopher-zombie.png")} />
        </div>
        <hr />
        <div className="feature-element-content">
          <h3>
            Golang
          </h3>
          <a className="feature-btn" href={docUrl('prereqs.html', props.language)}>
            <translate>
              Read More
            </translate>              
          </a>
        </div>
      </div>
      <div className="feature-element">
        <div className="feature-element-content">
          <img src={imgUrl("unity-zombie.png")} />
        </div>
        <hr />
        <div className="feature-element-content">
          <h3>
            Unity
          </h3>
          <a className="feature-btn" href={docUrl('unity-sdk.html', props.language)}>
            <translate>
              Read More
            </translate>              
          </a>
        </div>
      </div>      
    </div>
  </div>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>Feature Callout</h2>
    <MarkdownBlock>These are features of this project</MarkdownBlock>
  </div>
);



const Banner = props => (
  <div className="banner dark-bg">
    <div className="wrapper">
      <div className="artifact-container">
        <img src={imgUrl("oval-white-artifact.svg")} className="artifact artifact-5" />
        <img src={imgUrl("square-artifact.svg")} className="artifahttps://trello.com/b/tfO19nMv/cryptozombies-marketingct artifact-4" />
        <img src={imgUrl("triangle-artifact.svg")} className="artifact artifact-3" />
        <img src={imgUrl("circle-green-artifact.svg")} className="artifact artifact-2" />
        <img src={imgUrl("square-yellow-artifact.svg")} className="artifact artifact-1" />
      </div>
      <div className="banner-copy">
        <h1>
          Loom SDK
          <span className="banner-beta-label">Beta</span>
        </h1>        
        <h3><translate>Build decentralized worlds</translate></h3>
      </div>
      <div className="banner-mascot-container">
        <div className="banner-mascot-container-decal"></div>
        <img src={imgUrl("zombie-mascot.png")} />
      </div>
    </div>
  </div>
);

const Docs = props => (
<div className="docs wrapper">
  <div>
    <img src={imgUrl("zombie-docs.png")} />
  </div>   
  <div className="docs-copy-content">
  <a className="download-btn" href={docUrl('prereqs.html', props.language)}>
    <h3><translate>Docs</translate></h3>
  </a>
    <p>          
      Check out the <a href={docUrl("prereqs.html", props.language)}>docs</a> to get started building decentralized apps on your own DappChain.
    </p>
  </div>
</div>
);

// const Banner = props => (
//   <div className="banner tile-bg">
//     <div className="wrapper">
//       <div className="banner-copy">
//         <h1>
//           Loom SDK
//         </h1>
//         <h3>Build decentralized worlds</h3>
//         <p>
//           This is an intro to building your first DAppChain using Go on the DAppchain and Solidity on Mainnet.
//         </p>
//       </div>
//       <div className="banner-form">
//         <div className="form-container">
//           <h3 className="mb-3">
//             SIGN UP FOR BETA ACCESS <br />
//           </h3>
//            <input type="email" className="email-input mb-3" name="email" placeholder="Email" />
//            <a className="sign-up-btn">Sign up</a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

const Prereqs = props => (
  <div className="prereqs-container global-padding">
    <div className="prereqs custom-section">
      <div className="header-content">
        <h3>
          Prerequisites
        </h3>
        <p>
          Golang for directions on how to set it up
        </p>
      </div>
      <pre>
        <code className="dark-code">
        brew install wget
        wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
        sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
        sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
        mkdir ~/gopath
        export GOPATH=~/gopath
        </code>
      </pre>
      <p>
          *Add GOPATH to your bashrc <br />
          Protobufs https://github.com/google/protobuf/releases/tag/v3.5.1
      </p>
      <pre>
        <code className="dark-code">
          wget go1.1.0.1.darwin-amd64.tar.gz <br />
          tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
        </code>
      </pre>
    </div>
  </div>
);

const Instructions = props => (
  <div className="instructions custom-section">
    <div className="grid-container">
      <div className="wrapper">
        <div className="grid-col grid-col-2">
          <h3>
            Step 1. Setup the dependencies
          </h3>
          <pre>
            <code className="light-code">
            brew install wget <br />
        wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
        sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
        sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
        mkdir ~/gopath
        export GOPATH=~/gopath
            </code>
          </pre>
        </div>
        <div className="grid-col grid-col-2">
          <h3>
            Step 2. Create a project
          </h3>
          <pre>
            <code className="light-code">
              wget go1.1.0.1.darwin-amd64.tar.gz <br />
              tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
            </code>
          </pre>
          <p>
            Loom Platform has generators for a default project
          </p>
        </div>
      </div>
    </div>
    <div className="grid-container">
      <div className="wrapper">
        <div className="grid-col grid-col-2">
          <h3>
            Step 3. Setup a new transaction
          </h3>
          <pre>
            <code className="light-code">
              wget go1.1.0.1.darwin-amd64.tar.gz <br />
              tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
            </code>
          </pre>
        </div>
        <div className="grid-col grid-col-2">
          <h3>
            Step 4. Startup the blockchain
          </h3>
          <pre>
            <code className="light-code">
              wget go1.1.0.1.darwin-amd64.tar.gz <br />
              tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
            </code>
          </pre>
          <p>
            Loom Platform has generators for a default project
          </p>
        </div>
      </div>
    </div>
    <div className="grid-container">
      <div className="wrapper">
        <div className="grid-col grid-col-2">
          <h3>
            Step 5. Generate JS client
          </h3>
          <pre>
            <code className="light-code">
              wget go1.1.0.1.darwin-amd64.tar.gz <br />
              tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
            </code>
          </pre>
        </div>
        <div className="grid-col grid-col-2">
          <h3>
            Step 6. Interact with the Blockchain
          </h3>
          <pre>
            <code className="light-code">
              wget go1.1.0.1.darwin-amd64.tar.gz <br />
              tar -C /usr/local -xzf go1.1.0.1.darwin-amd64.tar.gz
            </code>
          </pre>
          <p>
            <translate>
              Loom Platform has generators for a default project
            </translate>
          </p>
        </div>
      </div>
    </div>
  </div>
);


const Download = props => (
  <div className="download custom-section global-padding">
{/*
    <ul className="download-btn-container">
      <li className="border-right">
        <span>
          SDK
        </span>
      </li>
      <li>
        <span>0.1.94</span>
      </li>
      <li className="border-left">
      <a className="download-btn" href={docUrl('prereqs.html', props.language)}><translate>Get Started!</translate></a>
           */}   {/* <a className="download-btn" href="https://private.delegatecall.com/loom/osx/build-285/loom">Download OSX</a> */}
    {/*   </li>
    </ul> */}
    {/* <div className="link-container center-text">
      <a href={pageUrl('platforms.html', props.language)}><translate>Other platforms</translate></a>
    </div> */}
  </div>

)

const Suggestions = props => (
  <div className="suggestions custom-section">
    <h3>
      <translate>
          What should we be building?
      </translate>
    </h3>
  </div>
)

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: 'Talk about learning how to use this',
        image: imgUrl('zombie-dude.png'),
        imageAlign: 'right',
        title: 'Learn How',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: 'Talk about trying this out',
        image: imgUrl('zombie-dude.png'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark">
    {[
      {
        content: 'This is another description of how this project is useful',
        image: imgUrl('zombie-dude.png'),
        imageAlign: 'right',
        title: 'Description',
      },
    ]}
  </Block>
);

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
        <a href={user.infoLink} target="_blank" key={i}>
          <img src={userImgUrl(user.image)} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h3><translate>Who's Using This?</translate></h3>
      <p><translate>Here are some of the teams who are building on the Loom SDK</translate></p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language;

    return (
      <div className="landing-page">
        <div className="mainContainer">
          <Banner language={language}/>
          <Download language={language} />
          <Features language={language} />
          <Docs language={language} />
          {/* <Prereqs />
          <Instructions /> */}
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;

// Unused components
// <HomeSplash language={language} />
// <Showcase language={language} />
// <Suggestions />
