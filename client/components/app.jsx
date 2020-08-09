import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './card';
import Skills from './skills';
import NewAgentModal from './newAgentModal';

const App = () => {
  const [ agents, setAgents ] = useState([]);
  const [ skills, setSkills ] = useState([]);
  const [ showNewAgentModal, setShowNewAgentModal ] = useState(false);
  const [ agentForm, setAgentForm ] = useState({
    name: '',
    class: '',
    img: ''
  });

  const handleChange = (e, prop) => {
    setAgentForm({ ...agentForm, [prop]: e.target.value });
  };

  const clearForm = () => {
    setAgentForm({
      name: '',
      class: '',
      img: ''
    });
  };

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
      })
      .catch(err => console.error(err));
  };

  const getAgentSkills = id => {
    fetch(`/api/skills.php?id=${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setSkills(res.data);
        }
      })
      .catch(err => console.error(err));
  };

  const addAgent = agentObj => {
    fetch(`/api/agents.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agentObj) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setShowNewAgentModal(false);
          grabAllAgents();
          clearForm();
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Main>
      <Button onClick={() => setShowNewAgentModal(true)}> Add Agent </Button>
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
      {
        showNewAgentModal ? <NewAgentModal agentForm={agentForm} handleChange={handleChange} setShowNewAgentModal={setShowNewAgentModal} addAgent={addAgent}/> : null
      }
    </Main>
  );
};

const Space = styled.div`
  min-width: 1rem;
  height: 1rem;
`;

const Main = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://i.redd.it/qg4enmbd90t41.png');
  background-size: cover;
  background-position: center;
  padding: 1rem;

  & .main {
    margin: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    min-height: 50rem;
    max-width: 83rem;
    border-radius: 5px;
    border: 2px solid black;
    display: flex;
    overflow: scroll;
    background: rgba(255, 255, 255, 0.9);
`;

const Button = styled.div`
    height: 2.5rem;
    width: 8rem;
    border-radius: 2rem;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.4s ease;
    border: 1px solid red;
    margin: auto;
    margin-bottom: 1rem;

    &:hover {
      transform: scale(1.05);
    }
`;

export default App;
