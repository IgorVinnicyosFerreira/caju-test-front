describe('New User page', () => {
  describe('navigation', () => {
    it('should be able to go back to dashboard', () => {
      cy.visit('http://localhost:3001/#/new-user');
      cy.get('[data-testid="go-to-dash"]').click();
    })
  });

  describe('registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/#/dashboard');
      cy.get('[data-testid="go-to-new-user"]').click();
    });
  
    it('should register a new user and redirect to dashboard', () => {
      const mockData = {
        "id": "94ca",
        "employeeName": "Igor Ferreira",
        "email": "dev.igor.ferreira@gmail.com",
        "cpf": "89042255072",
        "admissionDate": "2024-10-18",
        "status": "REVIEW"
      };
  
      cy.intercept('POST', `http://localhost:3000/registrations`, {
        statusCode: 200,
      }).as('createUser');
  
      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [mockData],
      }).as('getData');
  
      cy.get('[data-testid="text-field-name"]').type(mockData.employeeName);
      cy.get('[data-testid="text-field-email"]').type(mockData.email);
      cy.get('[data-testid="text-field-cpf"]').type(mockData.cpf);
      cy.get('[data-testid="text-field-admissionDate"]').type(mockData.admissionDate);
  
      cy.get('[data-testid="submit-form"]').click();
  
      cy.wait('@createUser');
      cy.get('[data-testid="snackbar"').should('be.visible');
  
      cy.url().should('contain', 'dashboard');
      cy.get('[data-testid="admission-column"][status="REVIEW"]').contains(mockData.employeeName);
    });
  
    it('should not register a new user with invalid data', () => {
      cy.get('[data-testid="text-field-name"]').type("123 teste");
      cy.get('[data-testid="text-field-email"]').type("igor@dd");
      cy.get('[data-testid="text-field-cpf"]').type("63792391212");
  
      cy.get('[data-testid="submit-form"]').click();
  
      cy.get('[data-testid="error-text-field-name"]').contains('O Nome não deve começar com números');
      cy.get('[data-testid="error-text-field-email"]').contains('Email inválido');
      cy.get('[data-testid="error-text-field-cpf"]').contains('CPF inválido');
      cy.get('[data-testid="error-text-field-admissionDate"]').contains('Data de admissão é obrigatório');
      cy.url().should('contain', 'new-user');
    });
  });
});