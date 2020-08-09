import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './card';
import Skills from './Skills';

const App = () => {
  const [ agents, setAgents ] = useState([]);
  const [ skills, setSkills ] = useState([]);

  useEffect(() => {
    grabAllAgents();
  }, []);

  const grabAllAgents = () => {
    fetch(`/api/agents.php`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setAgents(res.data);
        }
      });
  };

  const getAgentSkills = id => {
    fetch(`/api/skills.php?id=${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setSkills(res.data);
        }
      });
  };

  return (
    <Main>
      <div className="main">
        {
          agents.length
            ? agents.map(agent => {
              return (
                <Card key={agent.id} agent={agent} getAgentSkills={getAgentSkills} />
              );
            })
            : <h1> No agents available </h1>
        }
        <Space />
      </div>
      <Skills skills={skills}/>
    </Main>
  );
};

const Space = styled.div`
  min-width: 1rem;
  height: 1rem;
`;

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://i.redd.it/qg4enmbd90t41.png');
  background-size: cover;
  background-position: center;

  & .main {
    margin: 1rem;
    padding: 1rem;
    min-height: 50rem;
    width: 80rem;
    max-width: 80rem;
    border-radius: 5px;
    border: 2px solid black;
    display: flex;
    overflow: scroll;
    background: rgba(255, 255, 255, 0.9);

`;

export default App;
