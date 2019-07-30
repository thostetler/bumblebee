import React from 'react';
import logo from 'styles/img/transparent_logo.svg';
import orcidLogoInactive from 'styles/img/orcid_inactive.png';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    <>
      <Navbar expand="md" style={{
        backgroundColor: '#1a1a1a'
      }}>
        <NavbarBrand href="/">
          <img src={ logo } height="48" alt="ads logo" aria-hidden="true"/>
          <h1 className="text-white d-inline" style={{
            'position': 'relative',
            'top': '6px',
            'left': '6px',
            'fontSize': '35px',
            'WebkitFontSmoothing': 'antialiased',
            'fontWeight': 'bold',
            'margin': '0',
            'padding': '0',
            'letterSpacing': '.1rem'
          }}>ads</h1>
        </NavbarBrand>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar className="ml-3">
              <DropdownToggle nav caret className="text-white btn btn-outline-primary">
                Feedback
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Option 1
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="ml-3">
              <DropdownToggle nav caret className="text-white">
                <img src={ orcidLogoInactive } alt="orcid logo inactive" aria-hidden="true" height="18" /> Orcid
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Option 1
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="ml-3">
              <DropdownToggle nav caret className="text-white">
                <Icon icon={ faQuestionCircle } /> About
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Option 1
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="ml-3">
              <DropdownToggle nav caret className="text-white">
                <Icon icon={ faUser } /> Account
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Option 1
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </>
    );
  }
}
