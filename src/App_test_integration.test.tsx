import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import { test, expect, describe, vi } from 'vitest';
import { useNotesStore } from './notesStore';

describe('Notes App.tsx tests', () => {
    beforeEach(() => {
        useNotesStore.getState().reset();
    });

    test('notes list should be empty', async () => {
        render(<App />);

        // ACT

        // ASSERT
        expect(screen.getByTestId('note-list')).toBeEmptyDOMElement();
    });

    test('Todo list should have 1 element', async () => {
        render(<App />);
        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world');
    });

    test('Todo list should have 2 elements', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));
        await userEvent.type(screen.getByTestId('note-title'), 'test2');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world 2');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world');
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world 2');
    });

    test('Todo list should have 1 element after delete', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));
        await userEvent.type(screen.getByTestId('note-title'), 'test2');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world 2');
        await userEvent.click(screen.getByTestId('note-button'));
        await userEvent.click(screen.getAllByTestId('note-delete')[1]);
        await userEvent.click(screen.getByTestId('note-confirm'));

        // ASSERT
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world');
        expect(screen.getByTestId('note-list')).not.toHaveTextContent('Hello world 2');
    });
});
