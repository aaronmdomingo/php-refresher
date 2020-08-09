import React from 'react';
import styled from 'styled-components';

const Card = ({ agent, getAgentSkills }) => {
  const { img, name, id } = agent;

  return (
    <CardContainer background={img} onClick={() => getAgentSkills(id)}>
      <h2 className="card__name"> {name} </h2>
      <h3 className="card__class"> {agent.class}</h3>
    </CardContainer>
  );
};

const CardContainer = styled.div`
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

  & .card__name {
    font-size: 2.5rem;
    color: #000000;
  }

  & .card__class {
    font-size: 1.75rem;
    color: red;
  }
`;

export default Card;
