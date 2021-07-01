describe("Test adding object", () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/add');
  });


  it('should add object', () => {
    cy.get('#name').type('Krakow');
    cy.get('#location').type('21.0122, 13.23456');
    cy.get('#description').type('Kraków test');
    cy.get('#url').type('https://en.wikipedia.org/wiki/');
    cy.get('#update').click();
    cy.wait(3000);
  });


  it('should test url', () => {

    cy.get('#name').type('Krakow');
    cy.get('#location').type('21.0122, 13.23456');
    cy.get('#description').type('Kraków test');
    cy.get('#url').type('https://test.wikipedia.org/wiki/test');
    cy.get('#update').click();
    cy.wait(3000);
  })


  it('should test locationt', () => {

    cy.get('#name').type('Krakow');
    cy.get('#location').type('a21,4566, 23,7890');
    cy.get('#description').type('Kraków test');
    cy.get('#url').type('https://en.wikipedia.org/wiki/test');
    cy.get('#update').click();
    cy.wait(3000);
  })
});
