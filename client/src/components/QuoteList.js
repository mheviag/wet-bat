import React, {Fragment, Component} from "react";
import QuoteController from '../controllers/QuoteController';
//Bootstrap Components
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dialog from 'react-bootstrap-dialog';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class QuoteList extends Component {

    constructor(props) {
        super(props);
        this.editQuote = this.editQuote.bind(this);
        this.deleteQuote = this.deleteQuote.bind(this);

        this.quoteCtrl = new QuoteController();
        
        this.state = {
            quoteList: []
        }
    }

    componentDidMount() {
        let quotes = [];
        this.quoteCtrl.getQuotes()
        .then(res => {
            quotes = res.map((data) => {
                return data;
            });
            this.setState({
                quoteList: quotes
            });
        });

        Dialog.setOptions({
            defaultOkLabel: 'Yes',
            defaultCancelLabel: 'No',
            primaryClassName: 'btn-primary',
            defaultButtonClassName: 'btn-secondary'
        });
    }

    renderRows() {
        const context = this;
        const {summary} = this.props;

        const list = summary ?  
            this.state.quoteList.filter(function(quote) {
                return quote.status === "Pending"
            }) 
            : this.state.quoteList;

        return  list.map(function(quote, i) {
            return (<tr key={quote.id}>
                <td>{quote.id}</td>
                <td>{quote.fname + " " + quote.lname}</td>
                {summary ? null : <td>{quote.departuredate.substr(0,10)}</td>}
                {summary ? null : <td>{quote.returndate.substr(0,10)}</td>}
                {summary ? null : <td>{quote.departurecity}</td>}
                <td>{quote.destinationcity}</td>
                <td>{quote.price ? '$' + parseFloat(quote.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0.00"}</td>
                {summary ? null : <td>{quote.status}</td>}
                <td><Button onClick={context.editQuote.bind(context, quote.id)}><i className="fas fa-pencil-alt px-2"></i></Button></td>
                {summary ? null : <td><Button onClick={context.deleteQuote.bind(context, quote.id)} variant="secondary"><i className="fas fa-trash-alt px-2"></i></Button></td>}
            </tr>)
        });




        
    }

    addQuote() {
        window.location.href = "/quotes/edit/";
    }

    editQuote(id) {
        window.location.href = "/quotes/edit/" + id;
    }

    deleteQuote(id) {
        this.dialog.show({
            title: 'Delete',
            body: 'Are you sure you want to delete this record?',
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                    this.quoteCtrl.deleteQuote(id)
                    .then(res => {
                        window.location.reload();
                    });
                })
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide();
            }
          })
    }


    render(){
        const {summary} = this.props;
        return (
            <Fragment>
                <Dialog ref={(component) => { this.dialog = component }} />
                
                <span className="card-title">
                    <i className="fas fa-history mr-2"></i>
                    {summary ? "Pending" : ""} Quotes
                </span>
                <hr/>
                {summary ? "" :
                    <Row>
                        <Col>
                            <Form.Group>
                                <Button onClick={this.addQuote.bind(this)}>New</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                }
                
                <Table hover size="sm">
                    <thead>
                        <tr>
                        <th>ID #</th>
                        <th>Name</th>
                        {summary ? null : <th>Return Date</th>}
                        {summary ? null : <th>Departure Date</th>}
                        {summary ? null : <th>Departure</th>}
                        <th>Destination</th>
                        <th>Price</th>
                        {summary ? null : <th>Status</th>}
                        <th></th>
                        {summary ? null : <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>

            </Fragment>
        );
    }
    
}


