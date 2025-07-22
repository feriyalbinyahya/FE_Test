import { Button, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const LaporanFilterBar = ({ search, onSearchChange, tanggal, onDateChange, onApply, onReset }) => (
  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
    <TextField label="Cari Gerbang" size="small" value={search} onChange={onSearchChange} />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pilih Tanggal"
        value={tanggal}
        onChange={onDateChange}
        format="YYYY-MM-DD"
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
    <Button variant="contained" onClick={onApply}>Apply filter</Button>
    <Button variant="outlined" onClick={onReset}>Reset</Button>
  </Stack>
);