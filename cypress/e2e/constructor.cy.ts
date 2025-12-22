/// <reference types="cypress" />

const SELECTORS = {
  ingredientModal: '[data-testid="modal"]',
  orderModal: '[data-testid="order-modal"]',
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  orderButton: '[data-testid="order-button"]',
  ingredient: (id: string) => `[data-testid="ingredient-${id}"]`,
  ingredientLink: (id: string) => `[data-testid="ingredient-link-${id}"]`,
  constructorRoot: '[data-testid="constructor-root"]',
  constructorList: '[data-testid="constructor-list"]',
  orderDetails: '[data-testid="order-details"]',
  orderNumber: '[data-testid="order-number"]',
  totalPrice: '[data-testid="total-price"]',
};

const INGREDIENT_IDS = {
  bun1: '60d3b41abdacab0026a733c6',
  main1: '60d3b41abdacab0026a733c8'
};

describe('Stellar Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    
    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');
    
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  describe('Modal windows', () => {
    it('should open ingredient details modal', () => {
      cy.get(SELECTORS.ingredientLink(INGREDIENT_IDS.bun1))
        .click({ force: true });
      
      cy.get(SELECTORS.ingredientModal).should('be.visible');
    });

    it('should close modal by clicking close button', () => {
      cy.get(SELECTORS.ingredientLink(INGREDIENT_IDS.bun1))
        .click({ force: true });
      
      cy.get(SELECTORS.modalClose).click({ force: true });
      cy.get(SELECTORS.ingredientModal).should('not.exist');
    });

    it('should close modal by clicking overlay', () => {
      cy.get(SELECTORS.ingredientLink(INGREDIENT_IDS.bun1))
        .click({ force: true });
      
      cy.get(SELECTORS.modalOverlay).click({ force: true });
      cy.get(SELECTORS.ingredientModal).should('not.exist');
    });
  });

  describe('Burger constructor', () => {
    it('should add bun and filling to constructor', () => {
      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.bun1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.constructorRoot).should('contain', 'Краторная булка N-200i');

      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.main1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.constructorList).should('contain', 'Филе Люминесцентного тетраодонтимформа');
    });

    it('should calculate total price', () => {
      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.bun1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.main1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.totalPrice).should('contain', '3498');
    });
  });

  describe('Order creation', () => {
    it('should create order successfully', () => {
      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.bun1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.ingredient(INGREDIENT_IDS.main1))
        .find('button:contains("Добавить")')
        .click({ force: true });
      
      cy.get(SELECTORS.orderButton).click({ force: true });

      cy.wait('@createOrder', { timeout: 20000 });

      cy.get(SELECTORS.orderModal, { timeout: 10000 }).should('be.visible');
      cy.get(SELECTORS.orderNumber, { timeout: 10000 }).should('contain', '12345');
      
      cy.get(SELECTORS.modalOverlay).click({ force: true });
      cy.get(SELECTORS.orderModal).should('not.exist');

      cy.get(SELECTORS.constructorRoot).contains('Выберите булки').should('exist');
      cy.get(SELECTORS.constructorList).contains('Выберите начинку').should('exist');
    });
  });
});
