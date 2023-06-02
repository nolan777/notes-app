export const Card = ({ notes, showFullComment, toggleAffichageCommentaire, editMode, setEditMode, modifierNote, supprimerNote }) => {
    // changer la couleur de la note en fonction de sa valeur
    const getColor = (note) => {
        if (note > 13) {
            return 'green';
        } else if (note > 10) {
            return 'yellow';
        } else if (note > 8) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    return (notes.map((note, index) => (
        <li key={index}>
            <div>
                <strong>{note.title}</strong> <p id="note" data-testid='note-color' className={getColor(note.note)} style={{ backgroundColor: getColor(note.note), color: "black" }}>- Note: {note.note}</p>
            </div>
            <div>{note.date}</div>
            <div>
                {showFullComment ? (
                    <div>{note.comment}</div>
                ) : (
                    <div>{note.comment.substring(0, 50)}...</div>
                )}
                <button onClick={toggleAffichageCommentaire}>
                    {showFullComment ? 'Voir moins' : 'Voir plus'}
                </button>
            </div>
            {!editMode && (
                <div>
                    <button data-testid='note-delete' onClick={() => supprimerNote(index)}>
                        Supprimer
                    </button>
                    <button data-testid='note-update' onClick={() => {
                        setEditMode(true),
                            modifierNote(index)
                    }
                    }>Modifier</button>
                </div>
            )}
        </li>
    )))
}