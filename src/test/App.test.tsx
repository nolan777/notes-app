import '@testing-library/jest-dom';
import { test, expect, describe, vi } from 'vitest';
import { useNotesStore } from '../notesStore';

describe('Note Store', () => {
	beforeEach(() => {
		useNotesStore.getState().reset();
	});

	test('addNote', () => {
		const note = {
			title: 'test',
			note: 10,
			comment: 'test',
			date: new Date().toLocaleDateString(),
		}
		const store = useNotesStore.getState();
		store.addNote(note);
		const store2 = useNotesStore.getState();

		expect(store2.notes).toContain(note);
	});

	test('deleteNote', () => {
		const note = {
			title: 'test',
			note: 10,
			comment: 'test',
			date: new Date().toLocaleDateString(),
		}
		const store = useNotesStore.getState();
		store.addNote(note);
		store.deleteNote(0);
		const store2 = useNotesStore.getState();

		expect(store2.notes).not.toContain(note);
	});

	test('updateNote', () => {
		const note = {
			title: 'test',
			note: 10,
			comment: 'test',
			date: new Date().toLocaleDateString(),
		}
		const store = useNotesStore.getState();
		store.addNote({
			title: 'test2',
			note: 10,
			comment: 'test',
			date: new Date().toLocaleDateString(),
		});
		store.updateNote(0, note);
		const store2 = useNotesStore.getState();

		expect(store2.notes).toContain(note);
	});

});