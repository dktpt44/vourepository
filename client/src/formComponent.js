import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {baseUrl} from '../src/baseUrl';

class FormComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            firstVal: '',
            secondVal:'',
            imgLoc:'',
            modeS: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked:target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });

    }

    async handleSubmit(event){
        event.preventDefault();
        const metaData ={
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        };
        const res = await fetch(baseUrl, metaData);
        const resJson = await res.json();
        console.log(resJson.resname);
        alert(JSON.stringify(resJson));
        this.setState({
            imgLoc : resJson.imgLoc
        });

    }


    render(){
        return(
            <div className = "container">
                <div className = "row row-content">
                    <div className ="col-12 formHeading">
                        <h3>Enter Parameters for voublazars script </h3>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="container">
                            <div className="row row-content ">


                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row className = "myForm">
                                <Label htmlFor="firstVal" md ={2}><strong> --ra: </strong> </Label>
                                <Col md={10}>
                                    <Input type="text" id="firstVal" name ="firstVal" placeholder ="xx.xxx" value={this.state.firstVal} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row className = "myForm">
                                <Label htmlFor="secondVal" md ={2}><strong> --dec: </strong> </Label>
                                <Col md={10}>
                                    <Input type="text" id="secondVal" name ="secondVal" placeholder ="xx.xxx" value={this.state.secondVal} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row className = "myForm">
                                <Col className="offset-md-2">
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name ="modeS" defaultChecked={this.state.modeS} onChange={this.handleInputChange}/> {' '}
                                            --mode s
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col className="offset-md-2" >
                                    <Button type="submit" color="primary">
                                        Run
                                    </Button>
                                </Col>
                            </FormGroup>

                        </Form>
                        </div>
                        </div>
                    </div>
                </div>

                <div className= "row row-content imgbody">
                    <div className ="col-md-8 offset-md-2">
                        <img src={this.state.imgLoc} alt ="From server" />
                    </div>
                </div>
            </div>
        );
    }
}
export default FormComponent;