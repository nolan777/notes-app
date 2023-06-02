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

    test('notes list should have 1 element', async () => {
        render(<App />);
        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-list')).toHaveTextContent('test');
        expect(screen.getByTestId('note-list')).toHaveTextContent('15');
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world');
    });

    test('notes list should update', async () => {
        render(<App />);
        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));
        await userEvent.click(screen.getByTestId('note-update'));
        await userEvent.type(screen.getByTestId('note-title'), 'test2');
        await userEvent.type(screen.getByTestId('note-number'), '12');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world2');
        await userEvent.click(screen.getByTestId('note-save'));

        // ASSERT
        expect(screen.getByTestId('note-list')).toHaveTextContent('test2');
        expect(screen.getByTestId('note-list')).toHaveTextContent('12');
        expect(screen.getByTestId('note-list')).toHaveTextContent('Hello world2');
    });

    test('notes list should have 2 elements', async () => {
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

    test('notes list should have 1 element after delete', async () => {
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

    test('notes below 8 should be red', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '7');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-color')).toHaveClass('red');
    });

    test('notes between 8 to 10 should be orange ', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '9');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-color')).toHaveClass('orange');
    });

    test('notes between 10 to 13 should be yellow ', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '12');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-color')).toHaveClass('yellow');
    });

    test('notes greater than 13 should be green ', async () => {
        render(<App />);

        // ACT
        await userEvent.type(screen.getByTestId('note-title'), 'test');
        await userEvent.type(screen.getByTestId('note-number'), '15');
        await userEvent.type(screen.getByTestId('note-comment'), 'Hello world');
        await userEvent.click(screen.getByTestId('note-button'));

        // ASSERT
        expect(screen.getByTestId('note-color')).toHaveClass('green');
    });
});
