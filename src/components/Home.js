import React, { Component } from 'react';
import { 
    ListGroup,
    ListGroupItem,
    Col,
    Row,
    Input
} from 'reactstrap';
import Counter from './Counter';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], search: '', filtered: [] }
    }

    componentDidMount() {
        const data = Array.isArray(JSON.parse(localStorage.getItem('data'))) ? JSON.parse(localStorage.getItem('data')) : []; 
        this.setState({ data, filtered: data });
    }

    onCheckedItem = (item) => {
        const { data } = this.state;
        const index = data.indexOf(item);
        if (index >= 0) {
            data[index] = { ...item, check: !item.check  };
            localStorage.setItem('data', JSON.stringify(data));
            this.setState({ data });
        }
    }

    onRemoveItem = (item) => {
        const { data } = this.state;
        const index = data.indexOf(item);
        if (index >= 0) {
            data.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(data));
            this.setState({ data });
        }
    }

    onChange = ({ target }) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { data } = this.state;

        this.setState({
            [name]: value
        });

        let currentList = [];
        let filteredList = [];

        if (value !== "") {
            currentList = data;
            filteredList = currentList.filter(({ name }) => {
                const itemNor = name.toLowerCase();
                const filterNor = value.toLowerCase();
                return itemNor.includes(filterNor);
            });
        } else {
            filteredList = data;
        }
        this.setState({
            filtered: filteredList
        });
    }

    render() {
        const data = this.state.filtered;

        return (
            <div>
                <Row>
                    <Col>
                        <h1 className="text-center mt-3">Checklist</h1>
                        {/* <Counter length={data.length} /> */}
                        <Counter data={data} />
                    </Col>
                </Row>          
                <Row>
                    <Col className="mb-4">
                        <Input type="text" name="search" placeholder="Enter item name here..." onChange={this.onChange }/>
                    </Col>
                </Row>                              
                <Row>
                    <Col>
                        <ListGroup>
                            {data.map((item, index) => (
                                <ListGroupItem className={ item.check === true ? 'strike' : '' } key={index}>
                                    <div className="pretty p-icon p-round">
                                        <input type="checkbox" name="check" id="check" checked={item.check} onChange={ () => this.onCheckedItem(item) } />
                                        <div className="state p-success">
                                            <i className="icon mdi mdi-check"></i>
                                            <label> { item.name }</label>
                                        </div>
                                    </div>  
                                    <div className="delete" onClick={ () => this.onRemoveItem(item) }>
                                        <i className="mdi mdi-trash-can-outline"></i>
                                    </div>
                                </ListGroupItem>
                            ))}                                        
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}