import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
    Nav
} from 'reactstrap';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Navbar className="bg-blue-custom" expand="md">
                    <NavbarBrand>Checklist</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/> 
                    <Collapse isOpen={open} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/add">Add Item</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}