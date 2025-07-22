import React, { useEffect, useState } from "react";
import {
  Button,Container,Dialog,DialogActions,DialogContent,
  DialogTitle,IconButton,Pagination,Paper,Stack,Table,
  TableBody,TableCell,TableContainer,TableHead,TableRow,
  TextField,Typography,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  getGerbangs,
  deleteGerbang,
  createGerbang,
  updateGerbang,
} from "../services/gerbangService";
import GerbangModal from "../components/GerbangModal";

const GerbangPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedData, setSelectedData] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const rowsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await getGerbangs();
      setData(response?.data?.rows?.rows || []);
    } catch (err) {
      console.error("Error get gerbangs:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item.NamaGerbang.toLowerCase().includes(search.toLowerCase()) ||
          item.NamaCabang.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleDelete = async (id, IdCabang) => {
    const result = await Swal.fire({
      title: "Hapus data ini?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await deleteGerbang({ id, IdCabang });
      fetchData();
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Master Data Gerbang</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setModalMode("add");
            setSelectedData(null);
            setIsModalOpen(true);
          }}
        >
          Tambah
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Cari Gerbang / Ruas"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 3 }}
      />

      <Paper elevation={3}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Ruas</TableCell>
                <TableCell>Gerbang</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((item, index) => (
                <TableRow key={`${item.id}-${item.IdCabang}`}>
                  <TableCell>{indexOfFirst + index + 1}</TableCell>
                  <TableCell>{item.NamaCabang}</TableCell>
                  <TableCell>{item.NamaGerbang}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setModalMode("edit");
                        setSelectedData(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => {
                        setViewData(item);
                        setIsViewDialogOpen(true);}
                      }
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id, item.IdCabang)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {currentRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Stack mt={3} alignItems="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
      </Stack>

      <GerbangModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        defaultData={selectedData}
        onSubmit={async (formData) => {
          try {
            if (modalMode === "add") {
              await createGerbang(formData);
              Swal.fire("Berhasil!", "Gerbang berhasil ditambahkan.", "success");
            } else {
              await updateGerbang(formData);
              Swal.fire("Berhasil!", "Data gerbang berhasil diperbarui.", "success");
            }
            setIsModalOpen(false);
            fetchData();
          } catch (err) {
            console.error("Error submit form:", err);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
          }
        }}
      />
      <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Detail Gerbang</DialogTitle>
        <DialogContent dividers>
            {viewData && (
            <Stack spacing={1}>
                <Typography><strong>ID Gerbang:</strong> {viewData.id}</Typography>
                <Typography><strong>ID Cabang:</strong> {viewData.IdCabang}</Typography>
                <Typography><strong>Nama Gerbang:</strong> {viewData.NamaGerbang}</Typography>
                <Typography><strong>Nama Cabang:</strong> {viewData.NamaCabang}</Typography>
            </Stack>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsViewDialogOpen(false)}>Tutup</Button>
        </DialogActions>
        </Dialog>
    </Container>
  );
};

export default GerbangPage;