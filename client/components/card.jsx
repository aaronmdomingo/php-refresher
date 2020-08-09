import React from 'react';
import styled from 'styled-components';

const Card = ({ agent, getAgentSkills, deleteAgent, toggleUpdate }) => {
  const { img, name, id } = agent;

  return (
    <CardContainer style={{ position: 'relative' }} background={img}>
      <button className="button button-update" onClick={() => toggleUpdate(agent)}> ? </button>
      <button className="button button-delete" onClick={() => deleteAgent(id)}> X </button>
      <div className="card" onClick={() => getAgentSkills(id)}>
        <h2 className="card__name"> {name} </h2>
        <h3 className="card__class"> {agent.class}</h3>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;

  & .button {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    outline: none;

    &-delete {
      position: absolute;
      top: 2.5%;
      right: 5%;
      background: #FF4655;
      color: #000000;
      border: 1px soli black;
      cursor: pointer;
      z-index: 1;
    }

    &-update {
      position: absolute;
      top: 2.5%;
      left: 5%;
      background: #25B68A;
      color: #000000;
      border: 1px soli black;
      cursor: pointer;
      z-index: 1;
    }
  }

  & .card {
    height: 48rem;
    min-width: 25rem;
    border-radius: 5px;
    border: 1px solid red;
    background: ${props => props.background ? `url(${props.background})` : 'white'};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 1rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-1rem);
    }

    & .__name {
      font-size: 2.5rem;
      color: #000000;
    }

    & .__class {
      font-size: 1.75rem;
      color: red;
    }
  }
`;

export default Card;
