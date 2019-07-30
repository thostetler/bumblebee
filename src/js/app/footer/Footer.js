import React from 'react';
import nasaLogo from 'styles/img/nasa.svg';
import siLogo from 'styles/img/smithsonian.svg';
import cfaLogo from 'styles/img/cfa.png';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faNewspaper,
  faUsers,
  faInfoCircle,
  faQuestionCircle,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';

const ExLink = ({ href, icon, children }) => {
  return (
    <>
    { icon && <Icon icon={ icon }/> } <a className="text-white-50" href={href} target="_blank" rel="noopener noreferrer">{ children }</a>
    </>
  );
}

const Footer = () => {
  return (
    <footer className="py-4 bg-dark text-white-50">
      <Container>
        <Row>
          <Col md={4}>
            <p className="text-white">© The SAO/NASA Astrophysics Data System</p>
            <p><Icon icon={ faEnvelope }/> adshelp[at]cfa.harvard.edu</p>
            <p>The ADS is operated by the Smithsonian Astrophysical Observatory under NASA Cooperative Agreement NNX16AC86A</p>
            <p class="d-flex flex-row justify-content-between">
              <ExLink href="http://www.nasa.gov"><img src={ nasaLogo } alt="" width="80" /></ExLink>
              <ExLink href="http://www.si.edu"><img src={ siLogo } alt="" width="66" /></ExLink>
              <ExLink href="https://www.cfa.harvard.edu/"><img src={ cfaLogo } alt="" width="120" /></ExLink>
            </p>
          </Col>
          <Col>
            <p className="text-white">Resource</p>
            <ul style={{ listStyle: 'none' }} className="pl-0">
              <li><ExLink href="https://ui.adsabs.harvard.edu/about/" icon={ faQuestionCircle }>About ADS</ExLink></li>
              <li><ExLink href="https://adsabs.github.io/help/" icon={ faInfoCircle }>ADS Help</ExLink></li>
              <li><ExLink href="https://adsabs.github.io/help/whats_new/" icon={ faBullhorn }>What's New</ExLink></li>
              <li><ExLink href="https://ui.adsabs.harvard.edu/about/careers/" icon={ faUsers }>Careers</ExLink></li>
            </ul>
          </Col>
          <Col>
            <p className="text-white">Social</p>
            <ul style={{ listStyle: 'none' }} className="pl-0">
              <li><ExLink href="https://twitter.com/adsabs" icon={ faTwitter }>@adsabs</ExLink></li>
              <li><ExLink href="https://adsabs.github.io/blog/" icon={ faNewspaper }>ADS Blog</ExLink></li>
            </ul>
          </Col>
          <Col md={4}>
            <p className="text-white">Project</p>
            <ul style={{ listStyle: 'none' }} className="pl-0">
              <li><ExLink href="https://adsisdownorjustme.herokuapp.com/">Is ADS down? (or is it just me...)</ExLink></li>
              <li><ExLink href="http://www.si.edu">Smithsonian Institution</ExLink></li>
              <li><ExLink href="http://www.si.edu/Privacy">Smithsonian Privacy Notice</ExLink></li>
              <li><ExLink href="http://www.si.edu/Termsofuse">Smithsonian Terms of Use</ExLink></li>
              <li><ExLink href="http://www.cfa.harvard.edu/sao">Smithsonian Astrophysical Observatory</ExLink></li>
              <li><ExLink href="http://www.nasa.gov">NASA</ExLink></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
