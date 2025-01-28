import React, { useState, useEffect, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Note } from "../types";

interface Category {
  id: number;
  name: string;
}

type AutocompleteOption = Category | { inputValue: string };

const StyledButton = styled(Button)({
  marginTop: "16px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

interface NoteFormProps {
  categories: Category[];
  addNote: (noteData: Partial<Note>) => Promise<void>;
  updateNote: (noteData: Note) => Promise<void>; // Update to Promise<void>
  editingNote: Note | null;
}

const filter = createFilterOptions<AutocompleteOption>();

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function NoteForm({
  categories,
  addNote,
  updateNote,
  editingNote,
}: NoteFormProps) {
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    content: "",
    category: { name: "" },
  });
  const [newCategory, setNewCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<AutocompleteOption[]>(categories);

  useEffect(() => {
    if (editingNote) {
      setNewNote(editingNote);
    }
  }, [editingNote]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleCategoryChange = (
    event: ChangeEvent<unknown>,
    value: string | AutocompleteOption | null
  ) => {
    if (typeof value === "string") {
      setNewCategory(value);
      setNewNote((prevNote) => ({ ...prevNote, category: { name: value } }));
    } else if (value && 'inputValue' in value) {
      setNewCategory(value.inputValue);
      setNewNote((prevNote) => ({
        ...prevNote,
        category: { name: value.inputValue },
      }));
    } else if (value) {
      setNewCategory(value.name);
      setNewNote((prevNote) => ({
        ...prevNote,
        category: { name: value.name },
      }));
    } else {
      setNewCategory("");
      setNewNote((prevNote) => ({
        ...prevNote,
        category: { name: "" },
      }));
    }
  };

  const handleCategorySearch = async (query: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notes/categories?query=${query}`
      );
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddOrUpdateNote = () => {
    const noteData: Note = {
      ...newNote,
      category: { name: newNote.category?.name || newCategory },
    } as Note;

    if (editingNote) {
      updateNote(noteData);
    } else {
      addNote(noteData);
    }
    setNewNote({ title: "", content: "", category: { name: "" } });
    setNewCategory("");
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {editingNote ? "Edit Note" : "Add a New Note"}
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={newNote.title || ""}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <label htmlFor="content-editor" id="content-editor-label">
        Content
      </label>
      <ReactQuill
        id="content-editor"
        aria-labelledby="content-editor-label"
        value={newNote.content || ""}
        onChange={(value) =>
          setNewNote((prevNote) => ({ ...prevNote, content: value }))
        }
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
      <Autocomplete
        freeSolo
        value={newNote.category?.name || ""}
        onChange={handleCategoryChange}
        filterOptions={(options, params) => {
          const filtered = filter(
            options.map(option => typeof option === 'string' ? { inputValue: option } : option),
            params
          );
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        options={categoryOptions}
        getOptionLabel={(option: string | AutocompleteOption) => {
          if (typeof option === "string") {
            return option;
          }
          if ('inputValue' in option) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            margin="normal"
            fullWidth
            onChange={(e) => handleCategorySearch(e.target.value)}
          />
        )}
      />
      {newNote.category?.name === "new" && (
        <TextField
          label="New Category"
          name="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <StyledButton
        variant="contained"
        startIcon={editingNote ? <EditIcon /> : <AddIcon />}
        onClick={handleAddOrUpdateNote}
      >
        {editingNote ? "Update Note" : "Add Note"}
      </StyledButton>
    </>
  );
}
