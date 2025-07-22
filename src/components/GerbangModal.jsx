import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

const GerbangModal = ({ open, onClose, onSubmit, mode = "add", defaultData }) => {
  const [form, setForm] = useState({
    id: "",
    IdCabang: "",
    NamaGerbang: "",
    NamaCabang: "",
  });

  useEffect(() => {
    if (mode === "edit" && defaultData) {
      setForm(defaultData);
    } else {
      setForm({ id: "", IdCabang: "", NamaGerbang: "", NamaCabang: "" });
    }
  }, [mode, defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "edit" ? "Edit" : "Tambah"} Data Gerbang</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              name="id"
              label="ID Gerbang"
              type="number"
              value={form.id}
              onChange={handleChange}
              required
              fullWidth
              disabled={mode === "edit"}
            />
            <TextField
              name="IdCabang"
              label="ID Cabang"
              type="number"
              value={form.IdCabang}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="NamaGerbang"
              label="Nama Gerbang"
              value={form.NamaGerbang}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="NamaCabang"
              label="Nama Cabang"
              value={form.NamaCabang}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Batal
          </Button>
          <Button type="submit" variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default GerbangModal;