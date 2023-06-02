import { useNotesStore } from '../../src/notesStore';

describe('template spec', () => {
  beforeEach(() => {
    useNotesStore.getState().reset();
  });

  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Add note', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-testid="note-title"]').type('test');
    cy.get('[data-testid="note-number"]').type('10');
    cy.get('[data-testid="note-comment"]').type('test');
    cy.get('[data-testid="note-button"]').click();
    /* ==== End Cypress Studio ==== */
  });

  it('Delete note', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-testid="note-title"]').type('test');
    cy.get('[data-testid="note-number"]').type('10');
    cy.get('[data-testid="note-comment"]').type('test');
    cy.get('[data-testid="note-button"]').click();
    cy.get('[data-testid="note-delete"]').click();
    cy.get('[data-testid="note-confirm"]').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('update note', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-testid="note-title"]').type('test');
    cy.get('[data-testid="note-number"]').type('10');
    cy.get('[data-testid="note-comment"]').type('test');
    cy.get('[data-testid="note-button"]').click();
    cy.get('[data-testid="note-update"]').click();
    cy.get('[data-testid="note-title"]').type('test2');
    cy.get('[data-testid="note-number"]').type('7');
    cy.get('[data-testid="note-comment"]').type('testtest');
    cy.get('[data-testid="note-save"]').click();
    /* ==== End Cypress Studio ==== */
  });
})