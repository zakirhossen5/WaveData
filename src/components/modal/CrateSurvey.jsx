import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CurrencyDollarIcon } from "@heroicons/react/solid";
import Cookies from 'js-cookie';

export default function CreateSurveyModal({
    show,
    onHide,
    Tiralid

}) {

    async function CreateSurvey(e) {
        e.preventDefault();
        const d = new Date();

        const { name, description, image, reward, surveyBTN } = e.target;
        var notificationSuccess = e.target.children[0].firstChild;
        var notificationError = e.target.children[0].lastChild;
        surveyBTN.children[0].classList.remove("hidden")
        surveyBTN.children[1].innerText = ""
        surveyBTN.disabled = true;
        try {
            await window.contract.contract.CreateSurvey(parseInt(Tiralid),Number(Cookies.get("userid")),name.value,description.value,d,image.value, Number(reward.value)).send({
                feeLimit: 1_000_000_000,
                shouldPollResponse: false
            });
           
            notificationSuccess.style.display = "block";
            surveyBTN.children[0].classList.add("hidden")
            surveyBTN.children[1].innerText = "Create Survey"
            name.value = "";
            description.value = "";
            image.value = "";
            reward.value = "";
            surveyBTN.disabled = false;       
            window.location.reload(); 
        } catch (error) {
            notificationError.style.display = "none";
            surveyBTN.children[0].classList.add("hidden");
            surveyBTN.children[1].innerText = "Create Survey";
            surveyBTN.disabled = false;
        }
        surveyBTN.children[0].classList.add("hidden")
        surveyBTN.children[1].innerText = "Create Survey";
        surveyBTN.disabled = false;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Survey
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Form onSubmit={CreateSurvey}>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <div id='notificationSuccess' name="notificationSuccess" style={{ display: 'none' }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
                            Success!
                        </div>
                        <div id='notificationError' name="notificationError" style={{ display: 'none' }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
                            Error! Please try again!
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <input required name="name" placeholder="Name" id="name" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Description</Form.Label>
                        <textarea required name="description" placeholder="Description" id="description" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>

                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Image</Form.Label>
                        <input required name="image" placeholder="Image link" id="image" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Reward</Form.Label>
                        <div className="input-group">
                            <span className="input-group-addon text-sm pt-2 pb-2 pl-3 pr-3 font-normal -mr-1 leading-none text-gray-700 text-center bg-gray-200 border-gray-400 border rounded">
                                <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
                            </span>
                            <input required name="reward" placeholder="Reward" id="reward" type='number' className="w-24 text-black pr-2 border-gray-400 border pl-2" />
                        </div>
                    </Form.Group>
                    <div className="d-grid">
                        <Button name="surveyBTN" type='submit' style={{ 'display': 'flex' }} className='w-3/12 h-12 flex justify-center items-center' variant='outline-dark' >
                            <i id='LoadingICON' name='LoadingICON' className="select-none block w-12 m-0 fa fa-circle-o-notch fa-spin hidden"></i>
                            <span id='buttonText'>Create Survey</span>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>

    );
}