import React, { useState } from 'react';
import styled from 'styled-components';
import InteractiveList from './components/InteractiveList/InteractiveList';
import { validationFunction } from './validators/validationFunction';
import { emailValidation } from './validators/regex';

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  padding: 20px;
`;

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const DemoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  font-size: 14px;
`;

const App: React.FC = () => {
  const [validationType, setValidationType] = useState<'none' | 'custom' | 'regex'>('none');

  const renderInteractiveList = () => {
    switch (validationType) {
      case 'custom':
        return (
          <InteractiveList 
            customValidation={validationFunction}
          />
        );
      case 'regex':
        return (
          <InteractiveList 
            customValidation={emailValidation}
          />
        );
      default:
        return <InteractiveList />;
    }
  };

  return (
    <CenteredContainer>
      <DemoContainer>
        <DemoSection>
          <SectionTitle>Interactive List with Validation</SectionTitle>
          <SectionDescription>
            Choose validation type to test different validation scenarios
          </SectionDescription>
        </DemoSection>

        <DemoSection>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button 
              onClick={() => setValidationType('none')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: validationType === 'none' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              No Validation
            </button>
            <button 
              onClick={() => setValidationType('custom')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: validationType === 'custom' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Custom (length &gt; 3)
            </button>
            <button 
              onClick={() => setValidationType('regex')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: validationType === 'regex' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Email Validation
            </button>
          </div>
          
          {validationType === 'custom' && (
            <SectionDescription>
              Custom validation: Only items with length greater than 3 characters will be accepted.
              The validation will take 2 seconds to complete (simulating server delay).
            </SectionDescription>
          )}
          
          {validationType === 'regex' && (
            <SectionDescription>
              Email validation: Only valid email addresses will be accepted.
              The validation will take 2 seconds to complete (simulating server delay).
            </SectionDescription>
          )}
        </DemoSection>

        {renderInteractiveList()}
      </DemoContainer>
    </CenteredContainer>
  );
};

export default App; 