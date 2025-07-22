import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const LaporanTable = ({ data, page, rowsPerPage, sortConfig, onSort, onPageChange, metodeFilter }) => {
  const paginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const getLabel = (key) => {
    return {
      tunai: "Tunai",
      etoll: "E-Toll",
      flo: "Flo",
      ktp: "KTP",
      total: "Keseluruhan",
      tanpaKtp: "E-Toll+Tunai+Flo",
    }[key];
  };

  const renderSortLabel = (key, label) =>
    <TableCell onClick={() => onSort(key)} sx={{ cursor: "pointer" }}>
      {label} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
    </TableCell>;

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            {renderSortLabel("NamaCabang", "Ruas")}
            {renderSortLabel("NamaGerbang", "Gerbang")}
            {renderSortLabel("IdGardu", "Gardu")}
            {renderSortLabel("Hari", "Hari")}
            {renderSortLabel("TanggalStr", "Tanggal")}
            <TableCell>Metode</TableCell>
            <TableCell>Gol I</TableCell>
            <TableCell>Gol II</TableCell>
            <TableCell>Gol III</TableCell>
            <TableCell>Gol IV</TableCell>
            <TableCell>Gol V</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.map((item, i) => (
            <TableRow key={`${item.IdCabang}-${item.IdGerbang}-${item.IdGardu}`}>
              <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
              <TableCell>{item.NamaCabang}</TableCell>
              <TableCell>{item.NamaGerbang}</TableCell>
              <TableCell>{item.IdGardu}</TableCell>
              <TableCell>{item.Hari}</TableCell>
              <TableCell>{item.TanggalStr}</TableCell>
              <TableCell>{getLabel(metodeFilter)}</TableCell>
              <TableCell>{item.gol1}</TableCell>
              <TableCell>{item.gol2}</TableCell>
              <TableCell>{item.gol3}</TableCell>
              <TableCell>{item.gol4}</TableCell>
              <TableCell>{item.gol5}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          color="primary"
        />
      </Box>
    </>
  );
};