import React, { useState } from 'react';
import styled from 'styled-components';

const NewAgentModal = ({ agentForm, handleChange, setShowNewAgentModal, addAgent, inEdit, setInEdit, clearForm, updateAgent }) => {
  const { name, img } = agentForm;
  const [ error, setError ] = useState('');
  const validateInputs = () => {
    for (const prop in agentForm) {
      if (!agentForm[prop] && prop !== 'id') {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateInputs()) {
      setError('');
      addAgent(agentForm);
    } else {
      setError('Please fill out all fields');
    }
  };

  const handleEdit = e => {
    e.preventDefault();
    if (validateInputs()) {
      setError('');
      updateAgent(agentForm);
    } else {
      setError('Please fill out all fields');
    }
  };

  const closeModal = () => {
    if (inEdit) {
      setInEdit(false);
      clearForm();
    }
    setShowNewAgentModal(false);
  };

  return (
    <AgentContainer>
      <ModalWrapper onClick={() => closeModal()} />
      <div className="agent__modal">
        <form className="agent__modal_form" onSubmit={inEdit ? handleEdit : handleSubmit}>
          <img className="agent__modal_icon" src="https://seekvectorlogo.net/wp-content/uploads/2020/04/valorant-vector-logo.png"/>
          <AgentInput type="text" placeholder="Name" onChange={e => handleChange(e, 'name')} value={name}/>
          <AgentInput type="text" placeholder="Class" onChange={e => handleChange(e, 'class')} value={agentForm.class}/>
          <AgentInput type="text" placeholder="Img" onChange={e => handleChange(e, 'img')} value={img}/>
          <div className="agent__modal_error"> { error } </div>
          {
            inEdit
              ? <button type="submit" className="agent__modal_button agent__modal_button-update"> Update </button>
              : <button type="submit" className="agent__modal_button agent__modal_button-submit"> Submit </button>
          }
        </form>
      </div>
    </AgentContainer>
  );
};

const ModalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const AgentContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;

  & .agent__modal {
    min-height: 45rem;
    width: 35rem;
    max-width: 35rem;
    background: #ffffff;
    z-index: 3;
    border-radius: 5px;

    &_icon {
      height: 10rem;
      margin-bottom: 6rem;
    }

    &_form {
      min-height: 45rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    &_button {
      height: 2.5rem;
      width: 8rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.4s ease;
      border: 1px solid black;
      outline: none;

      &-submit {
        background: #FF4655;
      }

      &-update {
        background: #25B68A;
      }
    }

    &_error {
      height: 2.5rem;
      width: 25rem;
      text-align: center;
      color: red;
    }
  }
`;

const AgentInput = styled.input`
  height: 2.5rem;
  width: 25rem;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  margin-bottom: 3rem;
  font-size: 1.15rem;
`;

export default NewAgentModal;
