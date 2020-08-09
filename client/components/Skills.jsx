import React from 'react';
import styled from 'styled-components';

const Skills = () => {
  return (
    <SkillDrawer>
      <div className="skills__actions">

      </div>
    </SkillDrawer>
  );
};

const SkillDrawer = styled.div`
    margin: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    min-height: 20rem;
    max-width: 83rem;
    background: #ffffff;
    border-radius: 5px;

    & .skills__actions {
      height: 3.5rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
`;

export default Skills;
