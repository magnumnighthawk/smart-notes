import { List, ListItem, ListItemText, Typography, Box, Chip, IconButton } from '@mui/material';
import { Label as LabelIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { Note } from '../types';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface NoteListProps {
  notes: Note[];
  editNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export default function NoteList({ notes, editNote, deleteNote }: NoteListProps) {
  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Notes
      </Typography>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id} style={{ backgroundColor: '#ffffff', marginBottom: '8px', borderRadius: '4px' }}>
            <ListItemText
              primary={<Typography variant="h6" component="div">{note.title}</Typography>}
              secondary={
                <>
                  <ReactQuill value={note.content} readOnly={true} theme="bubble" />
                  <Box marginTop="4px">
                    <Chip
                      icon={<LabelIcon />}
                      label={note.category.name}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </>
              }
            />
            <IconButton onClick={() => editNote(note)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteNote(note.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
