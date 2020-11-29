import React, {Fragment, Component} from "react";
import QuoteController from '../controllers/QuoteController';
import ListController from '../controllers/ListController';
//Bootstrap Components
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input-field';

export default class QuoteForm extends Component {
    
    constructor(props) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onEditForm = this.onEditForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.goToQuoteList = this.goToQuoteList.bind(this);
        this.acceptQuote = this.acceptQuote.bind(this);
        this.declineQuote = this.declineQuote.bind(this);

        this.quoteCtrl = new QuoteController();
        this.listCtrl = new ListController();
        
        this.state = {
            id: 0,
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
            price: 0,
            status: 'Pending'
        }
    }
    
    componentDidMount() {
        const {id} = this.props;

        this.quoteCtrl.getQuote(id)
        .then(res => {
            this.setState({
                id: res.id,
                departureId: res.departureid,
                destinationId: res.destinationid,
                departureDate: res.departuredate,
                returnDate: res.returndate,
                noOfTravelers: res.nooftravelers,
                transportationId: res.transportationid,
                fname: res.fname,
                lname: res.lname,
                phone: res.phone,
                email: res.email,
                price: res.price,
                status: res.status,
            });
        });

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
        console.log('hi');
        e.preventDefault();
        const data = this.state;
        this.quoteCtrl.addQuote(data)
        .then(res => {
            window.location.reload();
        });
    }

    onEditForm(e) {
        e.preventDefault();
        const data = this.state;
        console.log(data);
        this.quoteCtrl.updateQuote(data)
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

    goToQuoteList() {
        window.location.href ="/quotes";
    }

    acceptQuote() {
        const {id} = this.props;
        this.quoteCtrl.updateQuoteStatus({status: "Accepted", id: id})
        .then(res => {
            window.location.reload();
        });
    }

    declineQuote() {
        const {id} = this.props;
        this.quoteCtrl.updateQuoteStatus({status : "Declined", id: id})
        .then(res => {
            window.location.reload();
        });
    }

    render(){
        const {isEdit} = this.props;
        return (
            <Fragment>
                <span className="card-title">
                    <i className="fas fa-angle-double-right mr-2"></i>
                    {isEdit ? "Edit" : "New"} Quote
                </span>
                <hr/>
                <Row>
                    <Col sm="6">
                        <Form onSubmit={isEdit ? this.onEditForm : this.onSubmitForm}>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>From</Form.Label>
                                        <Form.Control as="select" value={this.state.departureId || ""}  name="departureId" onChange={this.handleInputChange} required>
                                            <option>From</option>
                                            {this.state.airportList}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Depart Date</Form.Label>
                                        <Form.Control 
                                            placeholder="Departure Date" 
                                            min={this.state.departureDate.substr(0,10) || new Date().toISOString().split("T")[0]}  type="date" value={this.state.departureDate.substr(0,10) || ""} 
                                            name="departureDate" 
                                            onChange={this.handleInputChange} 
                                            required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>People</Form.Label>
                                        <Form.Control placeholder="People" type="number" value={this.state.noOfTravelers || ""} name="noOfTravelers" onChange={this.handleInputChange} required/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control placeholder="First name" type="text" value={this.state.fname || ""} name="fname" onChange={this.handleInputChange} required />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control placeholder="Phone" type="text" value={this.state.phone || ""} name="phone" onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <CurrencyInput
                                            name="price"
                                            placeholder="$0.00"
                                            defaultValue={0}
                                            value={this.state.price || ""}
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
                                        <Form.Control as="select" value={this.state.destinationId || ""} name="destinationId" onChange={this.handleInputChange} required>
                                            <option>Destination</option>
                                            {this.state.airportList}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Return Date</Form.Label>
                                        <Form.Control 
                                            placeholder="Return Date" 
                                            min={this.state.returnDate.substr(0,10) || new Date().toISOString().split("T")[0]}  type="date" value={this.state.returnDate.substr(0,10) || ""} 
                                            name="returnDate" 
                                            onChange={this.handleInputChange} 
                                            required/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Transportation</Form.Label>
                                        <Form.Control as="select" value={this.state.transportationId || ""}  name="transportationId" onChange={this.handleInputChange}>
                                            <option>Transportation</option>
                                            {this.state.transportationList}
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control placeholder="Last name" type="text" value={this.state.lname || ""} name="lname" onChange={this.handleInputChange} required/>
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control placeholder="Email" type="text" value={this.state.email || ""} name="email" onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="text-center mt-5">
                                        <Form.Control type="hidden" name="status" value={this.state.status} />
                                        {this.state.status && isEdit ?
                                            <span className={"status-text " + this.state.status}>
                                            <i className={(this.state.status === "Accepted" ? "fas fa-check" : (this.state.status === "Declined" ? "fas fa-times" : "fas fa-hourglass-half")) + " mr-2"}></i>
                                            {this.state.status}
                                            </span>
                                        :""}
                                        
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="text-right">
                                        <Button type="submit">{isEdit ? "Save" : "Create"}</Button>
                                        {this.state.status && this.state.status !== "Accepted" && isEdit ? <Button className="ml-3" onClick={this.acceptQuote}>Accept</Button> : ""}
                                        {this.state.status && this.state.status === "Pending" && isEdit ? <Button variant="secondary" className="ml-3" onClick={this.declineQuote}>Decline</Button> : ""}
                                        <Button variant="secondary" onClick={this.goToQuoteList} className="ml-3">Cancel</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col sm="6"></Col>
                </Row>                    
            </Fragment>
        );
    }
    
}


