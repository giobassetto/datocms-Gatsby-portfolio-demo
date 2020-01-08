import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container ${showMenu ? "is-open" : ""}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className="container__sidebar">
            <div className="sidebar">
              <h6 className="sidebar__title">
                <Link to="/">Giovanni Bassetto </Link>
              </h6>
                <img className="avatar__sidebar" src={'https://scontent.fldb7-1.fna.fbcdn.net/v/t1.0-9/p960x960/48424926_1824301394363315_5190873495143186432_o.jpg?_nc_cat=111&_nc_oc=AQnlrZxgcTrLM0-3C_p2LxMF9S8_IBOM_XFlAL9K5Ir9b7lmTWaza5XjXJymQacX9ww&_nc_ht=scontent.fldb7-1.fna&_nc_tp=1&oh=f759f4220797f3201187d3162fb1cc4c&oe=5EA1A832'} />
              <div
                className="sidebar__intro"
                dangerouslySetInnerHTML={{
                  __html:
                    data.datoCmsHome.introTextNode.childMarkdownRemark.html
                }}
              />
              <ul className="sidebar__menu">
                <li>
                  <Link to="/" activeStyle={{ color: '#9055a2'}}>Início</Link>
                </li>
                <li>
                  <Link to="/about" activeStyle={{ color: '#9055a2'}}>Sobre mim</Link>
                </li>
              </ul>

              <h6 className="sidebar__title"> Redes Sociais</h6>

              <p className="sidebar__social">
                {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => {
                  if(profile.profileType.toLowerCase() === 'twitter') {
                    return;
                  } else if(profile.profileType.toLowerCase() === 'email') {
                    return;
                  } else {
                    return(
                      <a
                        key={profile.profileType}
                        href={profile.url}
                        target="blank"
                        className={`social social--${profile.profileType.toLowerCase()}`}
                      >
                        {" "}
                      </a>
                    )
                  }
                })}
                <a 
                  href="https://www.linkedin.com/in/giovanni-bassetto-69a557163/"
                  target="blank"
                  className="social social--linkedin"
                >
                  {""}
                </a>
              </p>
              <h6 className="sidebar__title"> Contato: </h6>
              <p className="contato__sidebar"> Email: giovannibasseto@gmail.com </p>
              <p className="contato__sidebar"> Celular: (43) 99872-1261 </p>
            </div>
          </div>
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
