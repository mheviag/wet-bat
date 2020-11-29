import React, {Fragment, Component} from "react";
import QuoteController from '../controllers/QuoteController';
import ListController from '../controllers/ListController';
//Form Components Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input-field';

export default class QuockQuote extends Component {
    
    constructor(props) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);

        this.quoteCtrl = new QuoteController();
        this.listCtrl = new ListController();
        
        this.state = {
            airportList: [],
            transportationList: [],
            departureId: null,
            destinationId: null,
            departureDate: '',
            returnDate: '',
            noOfTravelers: '',
            transportationId: null,
            fname: '',
            lname: '',
            phone: '',
            email: '',
            status: 'Pending'
        }
    }
    
    componentDidMount() {
        let airports = [];
        this.listCtrl.getAirports()
        .then(res => {
            airports = res.map((data) => {
                return data;
            });
            this.setState({
                airportList: airports.map((item) =>
                    <option key={item.id} value={item.id}>{item.code + " - " + item.city}</option>
                )
            });
        });

        let transportations = [];
        this.listCtrl.getTransportations()
        .then(res => {
            transportations = res.map((data) => {
                return data;
            });
            this.setState({
                transportationList: transportations.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            });
        });
    }

    onSubmitForm(e) {
        e.preventDefault();
        const data = this.state;
        this.quoteCtrl.addQuote(data)
        .then(res => {
            window.location.reload();
        });
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        //Set the new value to the state
        this.setState({ [name]: value });
    }

    handleCurrencyChange(e) {
        const value = e.value;
        const name = e.name;
        //Set the new value to the state
        this.setState({ [name]: value });
    }

    render(){
        return (
            <Fragment>
                <span className="card-title">
                    <i className="fas fa-angle-double-right mr-2"></i>
                    Quick quote
                </span>
                <hr/>
                
                <Form onSubmit={this.onSubmitForm}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control as="select" defaultValue="From" name="departureId" onChange={this.handleInputChange} required>
                                        <option>From</option>
                                        {this.state.airportList}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Depart Date</Form.Label>
                                    <Form.Control 
                                        placeholder="Departure Date" 
                                        min={new Date().toISOString().split("T")[0]} type="date" name="departureDate" 
                                        onChange={this.handleInputChange}
                                        required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>People</Form.Label>
                                    <Form.Control placeholder="People" type="number" name="noOfTravelers" onChange={this.handleInputChange} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="First name" type="text" name="fname" onChange={this.handleInputChange} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control placeholder="Phone" type="text" name="phone" onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <CurrencyInput
                                        name="price"
                                        placeholder="$0.00"
                                        defaultValue={0}
                                        allowDecimals={true}
                                        decimalsLimit={2}
                                        prefix="$"
                                        onChange={(value, name) => this.handleCurrencyChange({value, name})}
                                        className="form-control"
                                        />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control as="select" defaultValue="Destination" name="destinationId" onChange={this.handleInputChange} required>
                                        <option>Destination</option>
                                        {this.state.airportList}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control 
                                        placeholder="Return Date" 
                                        min={new Date().toISOString().split("T")[0]} 
                                        type="date" 
                                        name="returnDate" 
                                        onChange={this.handleInputChange}
                                        required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Transportation</Form.Label>
                                    <Form.Control as="select" defaultValue="Transportation" name="transportationId" onChange={this.handleInputChange}>
                                        <option>Transportation</option>
                                        {this.state.transportationList}
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Last name" type="text" name="lname" onChange={this.handleInputChange} required/>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Email" type="text" name="email" onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Control type="hidden" name="status" value="Pending" />
                                
                                <Form.Group className="text-center">
                                    <Button type="submit" className="mt-4">Create a quote</Button>
                                </Form.Group>
                            </Col>
                        </Row>

                </Form>
                    
            </Fragment>
        );
    }
    
}


