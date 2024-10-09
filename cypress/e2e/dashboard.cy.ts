describe('Dashboard page', () => {
  const mockList = [
    {
      id: "3",
      admissionDate: "2023-10-22",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "REPROVED",
      cpf: "78502270001",
    },
    {
      id: "94ca",
      employeeName: "Igor Ferreira",
      email: "dev.igor.ferreira@gmail.com",
      cpf: "89042255072",
      admissionDate: "2024-10-17",
      status: "APPROVED",
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/registrations', {
      statusCode: 200,
      body: mockList,
    }).as('getData');
    cy.visit('http://localhost:3001/#/dashboard');
  });

  describe('List admissions', () => {
    beforeEach(() => {
      cy.wait('@getData');
    });

    it('should list admissions separated by status', () => {
      const reviewCol = cy.get('[data-testid="admission-column"][status="REVIEW"]');
      reviewCol.should('be.visible');
      reviewCol.should('contain', 'Pronto para revisar');

      const approvedCol = cy.get('[data-testid="admission-column"][status="APPROVED"]');
      approvedCol.should('be.visible');
      approvedCol.should('contain', 'Aprovado');

      const reprovedCol = cy.get('[data-testid="admission-column"][status="REPROVED"]');
      reprovedCol.should('be.visible');
      reprovedCol.should('contain', 'Reprovado');

      cy.get('[data-testid="registration-card"]').should('be.visible');
    });

    it('should list admissions by valid CPF', () => {
      cy.get('[data-testid="text-field-cpf"]').type('89042255072');
      cy.get('[data-testid="registration-card"]').should('be.visible');

      cy.get('[data-testid="registration-card"]').contains('Igor Ferreira');
      cy.get('[data-testid="registration-card"]').contains('dev.igor.ferreira@gmail.com');
      cy.get('[data-testid="registration-card"]').contains('17/10/2024');
    });

    it('should show error message when typing invalid CPF', () => {
      cy.get('[data-testid="text-field-cpf"]').type('89042255022');
      cy.contains('CPF inválido');
    });

    it('should refetch admissions when click in refetch button', () => {
      cy.get('[data-testid="refetch-button"]').click();

      cy.wait('@getData').then((interception) => {

        expect(interception?.response?.statusCode).to.eq(200);
        expect(interception?.response?.body.length > 0).to.be.true;
      });
    });
  });

  describe('modify admission', () => {
    it('should be able to change the status of an admission to approved', () => {
      const mockData = {
        "id": "94ca",
        "employeeName": "Igor Ferreira",
        "email": "dev.igor.ferreira@gmail.com",
        "cpf": "89042255072",
        "admissionDate": "2024-10-18",
        "status": "REVIEW"
      };
      
      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [mockData],
      }).as('getData');
      cy.wait('@getData');

      cy.intercept('PATCH', `http://localhost:3000/registrations/${mockData.id}`, {
        statusCode: 200,
      }).as('updateStatus');

      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [{
          ...mockData,
          "status": "APPROVED"
        }],
      }).as('getData');

      cy.get('[data-testid="registration-card"][name="Igor Ferreira"] [data-testid="approve-button"]').click();
      cy.get('[data-testid="confirmation-dialog"]').should('be.visible');
      cy.get('[data-testid="confirmation-dialog"]').contains('Aprovar admissão');
      cy.get('[data-testid="accept-dialog"]').click();

      cy.wait('@updateStatus');
      cy.wait('@getData');

      cy.get('[data-testid="admission-column"][status="APPROVED"]').contains(mockData.employeeName);
      cy.get('[data-testid="snackbar"').should('be.visible');
    });

    it('should be able to change the status of an admission to reproved', () => {
      const mockData = {
        "id": "94ca",
        "employeeName": "Igor Ferreira",
        "email": "dev.igor.ferreira@gmail.com",
        "cpf": "89042255072",
        "admissionDate": "2024-10-18",
        "status": "REVIEW"
      };
      
      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [mockData],
      }).as('getData');
      cy.wait('@getData');

      cy.intercept('PATCH', `http://localhost:3000/registrations/${mockData.id}`, {
        statusCode: 200,
      }).as('updateStatus');

      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [{
          ...mockData,
          "status": "REPROVED"
        }],
      }).as('getData');

      cy.get('[data-testid="registration-card"][name="Igor Ferreira"] [data-testid="reprove-button"]').click();
      cy.get('[data-testid="confirmation-dialog"]').should('be.visible');
      cy.get('[data-testid="confirmation-dialog"]').contains('Reprovar admissão');
      cy.get('[data-testid="accept-dialog"]').click();

      cy.wait('@updateStatus');
      cy.wait('@getData');

      cy.get('[data-testid="admission-column"][status="REPROVED"]').contains(mockData.employeeName);
      cy.get('[data-testid="snackbar"').should('be.visible');
    });

    it('should be able to change the status of an admission to REVIEW', () => {
      const mockData = {
        "id": "94ca",
        "employeeName": "Igor Ferreira",
        "email": "dev.igor.ferreira@gmail.com",
        "cpf": "89042255072",
        "admissionDate": "2024-10-18",
        "status": "APPROVED"
      };
      
      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [mockData],
      }).as('getData');
      cy.wait('@getData');

      cy.intercept('PATCH', `http://localhost:3000/registrations/${mockData.id}`, {
        statusCode: 200,
      }).as('updateStatus');

      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [{
          ...mockData,
          "status": "REVIEW"
        }],
      }).as('getData');

      cy.get('[data-testid="registration-card"][name="Igor Ferreira"] [data-testid="review-button"]').click();
      cy.get('[data-testid="confirmation-dialog"]').should('be.visible');
      cy.get('[data-testid="confirmation-dialog"]').contains('Revisar admissão');
      cy.get('[data-testid="accept-dialog"]').click();

      cy.wait('@updateStatus');
      cy.wait('@getData');

      cy.get('[data-testid="admission-column"][status="REVIEW"]').contains(mockData.employeeName);
      cy.get('[data-testid="snackbar"').should('be.visible');
    });

    it('should be able to delete admission', () => {
      const mockData = {
        "id": "94ca",
        "employeeName": "Igor Ferreira",
        "email": "dev.igor.ferreira@gmail.com",
        "cpf": "89042255072",
        "admissionDate": "2024-10-18",
        "status": "REVIEW"
      };
      
      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [mockData],
      }).as('getData');
      cy.wait('@getData');

      cy.get('[data-testid="admission-column"][status="REVIEW"] [data-testid="registration-card"]').should('have.length', 1);

      cy.intercept('DELETE', `http://localhost:3000/registrations/${mockData.id}`, {
        statusCode: 200,
      }).as('delete');

      cy.intercept('GET', 'http://localhost:3000/registrations', {
        statusCode: 200,
        body: [],
      }).as('getData');

      cy.get('[data-testid="registration-card"][name="Igor Ferreira"] [data-testid="delete-button"]').click();
      cy.get('[data-testid="confirmation-dialog"]').should('be.visible');
      cy.get('[data-testid="confirmation-dialog"]').contains('Excluir admissão');
      cy.get('[data-testid="accept-dialog"]').click();

      cy.wait('@delete');
      cy.wait('@getData');

      cy.get('[data-testid="admission-column"][status="REVIEW"] [data-testid="registration-card"]').should('have.length', 0);
      cy.get('[data-testid="snackbar"').should('be.visible');
    });
  })
})