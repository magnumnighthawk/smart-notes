"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, AppBar, Toolbar, IconButton, Typography, Paper } from '@mui/material';
import { Note as NoteIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { Note } from '../types';

interface Category {
  id: number;
  name: string;
}

const StyledContainer = styled(Container)({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: '16px',
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  marginTop: '16px',
  backgroundColor: '#e0e0e0',
});

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    setIsClient(true);
    fetchNotes();
    fetchCategories();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addNote = async (noteData: Partial<Note>) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes`, noteData);
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (noteData: Note) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes/${noteData.id}`, noteData);
      fetchNotes();
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  if (!isClient) {
    return null;
  }

  return (
    <StyledContainer>
      <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <NoteIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Smart Notes Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledPaper elevation={3}>
        <NoteForm
          categories={categories}
          addNote={addNote}
          updateNote={updateNote}
          editingNote={editingNote}
        />
      </StyledPaper>
      <StyledPaper elevation={3}>
        <NoteList notes={notes} editNote={handleEditNote} deleteNote={deleteNote} />
      </StyledPaper>
    </StyledContainer>
  );
}
