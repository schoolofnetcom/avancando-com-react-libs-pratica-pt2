import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Insert from './components/Insert';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Header />
        <Container>
          <Row>
            <Col>
              <Router>
                <Route path="/" exact component={Home} />
                <Route path="/add" component={Insert} />
              </Router>
            </Col>
          </Row>
        </Container>
        <Footer />
      </main>
    );
  }
}