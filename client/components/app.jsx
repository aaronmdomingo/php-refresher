import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './card';
import Skills from './skills';
import NewAgentModal from './newAgentModal';

const App = () => {
  const [ agents, setAgents ] = useState([]);
  const [ skills, setSkills ] = useState([]);
  const [ showNewAgentModal, setShowNewAgentModal ] = useState(false);
  const [ showAdditionalDetails, setShowAdditionalDetails ] = useState(false);
  const [ currentAgent, setCurrentAgent ] = useState(null);
  const [ inEdit, setInEdit ] = useState(false);
  const [ agentForm, setAgentForm ] = useState({
    name: '',
    class: '',
    img: '',
    id: ''
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
    if (id !== currentAgent) {
      setShowAdditionalDetails(true);
      setCurrentAgent(id);
      fetch(`/api/skills.php?id=${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setSkills(res.data);
          }
        })
        .catch(err => console.error(err));
    } else {
      setShowAdditionalDetails(false);
      setCurrentAgent(null);
    }
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

  const updateAgent = agentObj => {
    fetch(`/api/agents.php`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agentObj) })
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

  const deleteAgent = id => {
    fetch(`/api/agents.php?id=${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setShowAdditionalDetails(false);
          setAgents(agents.filter(agent => agent.id !== id));
        }
      });
  };

  const toggleUpdate = agent => {
    setShowNewAgentModal(true);
    setInEdit(true);
    setAgentForm({
      name: agent.name,
      class: agent.class,
      img: agent.img,
      id: agent.id
    });
  };

  return (
    <Main>
      <div className="header"> Valorant Agents </div>
      <div className="main">
        {
          agents.length
            ? agents.map(agent => {
              return (
                <Card
                  key={agent.id}
                  agent={agent}
                  getAgentSkills={getAgentSkills}
                  deleteAgent={deleteAgent}
                  toggleUpdate={toggleUpdate}/>
              );
            })
            : null
        }
        <NewAgentCard onClick={() => setShowNewAgentModal(true)}>
          <button className="new__button"> + </button>
          <div className="new__text"> Add New Agent </div>
        </NewAgentCard>
        <Space />
      </div>
      {
        showAdditionalDetails ? <Skills skills={skills}/> : null
      }
      {
        showNewAgentModal
          ? <NewAgentModal
            agentForm={agentForm}
            handleChange={handleChange}
            setShowNewAgentModal={setShowNewAgentModal}
            addAgent={addAgent}
            inEdit={inEdit}
            setInEdit={setInEdit}
            clearForm={clearForm}
            updateAgent={updateAgent}/>
          : null
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
  background-attachment: fixed;
  padding: 1rem;

  & .header {
    font-size: 2.5rem;
    color: #ffffff;
    text-align: center;
    border-bottom: 2px solid #ffffff;
  }

  & .main {
    margin: auto;
    margin-top: 2rem;
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

const NewAgentCard = styled.div`
    height: 48rem;
    min-width: 25rem;
    border-radius: 5px;
    border: 1px solid red;
    margin: 1rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-1rem);
    }

    & .new__button {
      height: 4rem;
      width: 4rem;
      outline: none;
      border-radius: 50%;
      color: #FF4655;
      font-size: 2.5rem;
      border: 1px solid #FF4655;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    & new__text {
      font-size: 1.15rem;
    }
`;

export default App;
