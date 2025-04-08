import { FORMS } from 'js/react/FeedbackForms/models/index';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FeedbackForms } from 'suit';

const Container = styled.div`
  padding: 4rem 1rem;
`;

const formSelector = ({ main }) => ({ form: main.form });
const App = () => {
  const { form } = useSelector(formSelector);

  return (
    <Container className="container">
      {(() => {
        switch (form) {
          case FORMS.missingreferences:
            return <FeedbackForms.MissingIncorrectRecord />;
          case FORMS.associatedarticles:
            return <FeedbackForms.AssociatedReferences />;
          case FORMS.correctabstract:
            return <FeedbackForms.SubmitCorrectAbstract />;
          default:
            return <FeedbackForms.SubmitCorrectAbstract />;
        }
      })()}
    </Container>
  );
};

export default App;
