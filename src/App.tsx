import { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/card';
import { useNotesStore } from './notesStore';

function App() {
	const [title, setTitle] = useState<string>('');
	const [note, setNote] = useState<number>(0);
	const [comment, setComment] = useState<string>('');
	const [showFullComment, setShowFullComment] = useState<boolean>(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
	const store = useNotesStore.getState();
	const [editMode, setEditMode] = useState(false);

	const ajouterNote = () => {
		console.log("editMode", editMode);
		if (title.trim() !== '' && comment.trim() !== '') {
			if (note < 0 || note > 20 || isNaN(note)) {
				alert('La note doit être comprise entre 0 et 20');
			} else {
				const nouvelleNote = {
					title,
					note,
					comment,
					date: new Date().toLocaleDateString()
				};
				store.addNote(nouvelleNote);
				setTitle('');
				setNote(0);
				setComment('');
			}
		}
	};

	const supprimerNote = (index) => {
		store.deleteNote(index);
		setSelectedNoteIndex(null);
		setShowConfirmationModal(false);
	};

	const toggleAffichageCommentaire = () => {
		setShowFullComment(!showFullComment);
	};

	const ouvrirModalConfirmation = (index: number) => {
		setSelectedNoteIndex(index);
		setShowConfirmationModal(true);
	};

	const fermerModalConfirmation = () => {
		setSelectedNoteIndex(null);
		setShowConfirmationModal(false);
	};

	const modifierNote = (index) => {
		setSelectedNoteIndex(index);
		setTitle(store.notes[index].title);
		setNote(store.notes[index].note);
		setComment(store.notes[index].comment);
	};

	const enregistrerModification = () => {
		setEditMode(false);
		const nouvellesNotes = [...store.notes];
		nouvellesNotes[selectedNoteIndex] = {
			...nouvellesNotes[selectedNoteIndex],
			title,
			note,
			comment
		};
		store.updateNote(selectedNoteIndex, nouvellesNotes[selectedNoteIndex]);
		setSelectedNoteIndex(null);
		setTitle('');
		setNote(0);
		setComment('');
	};

	return (
		<div>
			<h1>Gestionnaire de Notes</h1>
			<div>
				<label htmlFor="title">Titre :</label>
				<input
					data-testid='note-title'
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="note">Note :</label>
				<input
					data-testid='note-number'
					type="number"
					id="note"
					min={0}
					max={20}
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="comment">Commentaire :</label>
				<textarea
					data-testid='note-comment'
					id="comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></textarea>
			</div>
			{/* <button onClick={ajouterNote}>Ajouter Note</button> */}
			{editMode ? (
				<div>
					<button data-testid='note-save' onClick={enregistrerModification}>Enregistrer</button>
					<button onClick={() => setEditMode(false)}>Annuler</button>
				</div>
			) : (
				<button data-testid='note-button' onClick={ajouterNote}>Ajouter Note</button>
			)}
			<ul data-testid='note-list'>
				<Card notes={store.notes} showFullComment={showFullComment} toggleAffichageCommentaire={toggleAffichageCommentaire} editMode={editMode} setEditMode={setEditMode} modifierNote={modifierNote} supprimerNote={ouvrirModalConfirmation} />
			</ul>
			{showConfirmationModal && (
				<div className="modal">
					<div className="modal-content">
						<p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
						<div>
							<button onClick={fermerModalConfirmation}>Annuler</button>
							<button data-testid='note-confirm' onClick={() => supprimerNote(selectedNoteIndex)}>Confirmer</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
