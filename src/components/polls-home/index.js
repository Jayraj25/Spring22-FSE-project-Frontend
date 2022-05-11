/**
 * @file renders the home page for polls
 */
import React from "react";
import * as service from "../../services/polls-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Modal,Button} from 'react-bootstrap';
import Polls from "../polls";

/**
 * @function Poll
 * @returns {JSX.Element} - the home page for polls
 * @constructor Poll
 */
const PollHome = () => {
    const location = useLocation();
    const {uid} = useParams();
    const [question, setQuestion] = useState('');
    const [poll, setPoll] = useState([]);
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(['','']);
    const [allOptions, setAllOptions] = useState([]);
    // const [formFields, setFormFields] = useState([{pollQuestion: '', pollOptions: [], closed: false}]);
    const [formFields, setFormFields] = useState({});
    const [pollClosed, setPollClosed] = useState(false);

    const resetForm = () => {
        setQuestion('');
        setOptions(['','']);
        setAllOptions([]);
        setFormFields({});
        setPollClosed(false);
    };
    const handleClose = () => {
        setShow(false);
        resetForm();
    }
    const handleShow = () => {
        setShow(true);
        resetForm();
    }
    const userId = uid;
    const findPolls = () =>
        service.findAllPolls()
            .then(polls => setPoll(polls));
    useEffect(() => {
        let isMounted = true;
        const x = findPolls()
        return () => {isMounted = false;}
    }, []);

    const addFormFields = () => {
        const values = [...allOptions];
        values.push({optionX : ""});
        setAllOptions(values);
        setOptions([...options, '']);
    };
    const removeOption = (index) => {
        const values = [...allOptions];
        values.splice(index, 1);
        setAllOptions(values);
        const vals = [...options];
        vals.splice(index+2, 1);
        setOptions(vals);
    };
    const submitForm = () => {
        formFields.pollQuestion = question;
        formFields.pollOptions = options;
        formFields.closed = pollClosed;
        setFormFields((prevState) => ({
            ...prevState,
            pollQuestion: question,
            pollOptions: options,
            closed: pollClosed
        }));
        service.createPoll('my', formFields)
            .then(findPolls);
        setShow(false);
    }

    const handleOptions = (e) => {
        const values = [...options];
        let index = e.target.getAttribute('id');
        index = parseInt(index.charAt(index.length - 1));
        values[index-1] = e.target.value;
        setOptions(values);
    }

    return(
        <div className="ttr-home">
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create your Poll here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="pollQuestion">Poll Question</label>
                            <input type="text" className="form-control" id="pollQuestion" placeholder="Type here"
                                   onChange={(e) => setQuestion(e.target.value)}/>
                            <label htmlFor="option1">Option 1</label>
                            <input type="text" className="form-control" id="option1"
                                   placeholder="Type your first option"
                                   onChange={(e) => handleOptions(e)}/>
                            <label htmlFor="option2">Option 2</label>
                            <input type="text" className="form-control" id="option2"
                                   placeholder="Type your second option"
                                   onChange={(e) => handleOptions(e)}/>
                            {
                                allOptions.length > 0 &&
                                    allOptions.map((option, index) =>(
                                        <div>
                                            <label htmlFor={`option${index+3}`}>Option {index+3}</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" id={`option${index+3}`}
                                               placeholder={`Type your option ${index+3}`}
                                               onChange={(e) => handleOptions(e)}>
                                                </input>
                                                <div className="input-group-append">
                                                    <Button className="btn btn-danger" onClick={()=>removeOption(index)}>
                                                        <i className="fas fa-remove"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                ))
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" type="button"
                            onClick={() => {addFormFields()}}>Add option</Button>
                    <Button variant="primary" onClick={submitForm}>
                        Create Poll
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Poll Screen</h4>
                <div className="d-flex">
                    <div className="p-2">
                        <img className="ttr-width-50px rounded-circle"
                             src={`../images/nasa-logo.jpg`} alt=""/>
                    </div>
                    <div className="p-2 w-100">
                        <div className="row">
                            <div className="col-10 ttr-font-size-150pc text-primary">
                                <i className="fas fa-portrait me-3"/>
                                <i className="far fa-gif me-3"/>
                                <i className="far fa-bar-chart me-3"/>
                                <i className="far fa-face-smile me-3"/>
                                <i className="far fa-calendar me-3"/>
                                <i className="far fa-map-location me-3"/>
                            </div>
                            <div className="col-2">
                                <a onClick={handleShow}
                                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                                    Poll
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Polls polls={poll}
                   refreshPolls={findPolls}/>
        </div>
    );
};
export default PollHome;
