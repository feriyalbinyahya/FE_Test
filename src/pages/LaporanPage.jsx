import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Paper,Stack, ButtonGroup,
} from "@mui/material";
import { getLalins } from "../services/lalinService";
import { getGerbangs } from "../services/gerbangService";
import { LaporanFilterBar } from "../components/LaporanFilterBar";
import { LaporanTable } from "../components/LaporanTable";

const LaporanPage = () => {
  const [tanggal, setTanggal] = useState(null);
  const [search, setSearch] = useState("");
  const [metodeFilter, setMetodeFilter] = useState("tunai");
  const [dataLalin, setDataLalin] = useState([]);
  const [dataGerbang, setDataGerbang] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const ambilJumlahByFilter = (item, filter) => {
    switch (filter) {
      case "tunai": return item.Tunai;
      case "etoll": return item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega;
      case "flo": return item.eFlo;
      case "ktp": return item.DinasOpr + item.DinasMitra + item.DinasKary;
      case "tanpaKtp": return item.Tunai + item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega + item.eFlo;
      case "total":
      default:
        return item.Tunai + item.DinasOpr + item.DinasMitra + item.DinasKary + item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega + item.eFlo;
    }
  };

  const fetchData = async () => {
    try {
      const formattedDate = tanggal ? tanggal.format("YYYY-MM-DD") : "";
      const lalinRes = await getLalins(formattedDate);
      const gerbangRes = await getGerbangs();
      const lalinData = lalinRes?.data?.rows?.rows || [];
      const gerbangData = gerbangRes?.data?.rows?.rows || [];

      setDataLalin(lalinData);
      setDataGerbang(gerbangData);
      setPage(1);
      if (lalinData.length === 0 || gerbangData.length === 0) {
        setMergedData([]); // ini akan membuat tabel langsung kosong
      }
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setMergedData([]);
    }
  };

  useEffect(() => {
    if (!dataLalin.length || !dataGerbang.length) return;
    const grouped = {};

    dataLalin.forEach((item) => {
      const key = `${item.IdCabang}-${item.IdGerbang}-${item.IdGardu}`;
      const gerbang = dataGerbang.find((g) => g.id === item.IdGerbang);
      const Hari = new Date(item.Tanggal).toLocaleDateString("id-ID", { weekday: "long" });
      const TanggalStr = new Date(item.Tanggal).toLocaleDateString("id-ID");
      const jumlah = ambilJumlahByFilter(item, metodeFilter);

      if (!grouped[key]) {
        grouped[key] = {
          IdCabang: item.IdCabang,
          IdGerbang: item.IdGerbang,
          IdGardu: item.IdGardu,
          Hari,
          TanggalStr,
          NamaGerbang: gerbang?.NamaGerbang || "-",
          NamaCabang: gerbang?.NamaCabang || "-",
          gol1: 0,
          gol2: 0,
          gol3: 0,
          gol4: 0,
          gol5: 0,
          total: 0,
        };
      }
       // Total per golongan
    switch (item.Golongan) {
      case 1:
        grouped[key].gol1 += jumlah;
        break;
      case 2:
        grouped[key].gol2 += jumlah;
        break;
      case 3:
        grouped[key].gol3 += jumlah;
        break;
      case 4:
        grouped[key].gol4 += jumlah;
        break;
      case 5:
        grouped[key].gol5 += jumlah;
        break;
      default:
        break;
    }
      grouped[key].total += jumlah;
    });

    const groupedArray = Object.values(grouped);
    setMergedData(groupedArray);
  }, [dataLalin, dataGerbang, metodeFilter]);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = mergedData.filter((item) =>
    item.NamaGerbang?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = sortData(filteredData);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Laporan Lalu Lintas Per Hari
      </Typography>

      <Paper elevation={2} sx={{ padding: 2, marginBottom: 4 }}>
        <LaporanFilterBar
            search={search} onSearchChange={(e) => setSearch(e.target.value)}
            tanggal={tanggal} onDateChange={setTanggal}
            onApply={fetchData}
            onReset={() => {
                setSearch("");
                setTanggal(null);
                setDataLalin([]);
                setDataGerbang([]);
                setMergedData([]);
                fetchData();
            }}
            />
      </Paper>

      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        <ButtonGroup variant="outlined" color="primary">
          {["tunai", "etoll", "flo", "ktp", "total", "tanpaKtp"].map((key) => (
            <Button
              key={key}
              variant={metodeFilter === key ? "contained" : "outlined"}
              onClick={() => setMetodeFilter(key)}
            >
              {key === "tunai" ? "Total Tunai" :
               key === "etoll" ? "Total E-Toll" :
               key === "flo" ? "Total Flo" :
               key === "ktp" ? "Total KTP" :
               key === "total" ? "Total Keseluruhan" : "Total E-Toll+Tunai+Flo"}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

      <Paper elevation={2}>
        <LaporanTable
            data={sortedData} page={page}
            rowsPerPage={rowsPerPage} sortConfig={sortConfig}
            onSort={handleSort} onPageChange={setPage}
            metodeFilter={metodeFilter}
            />
      </Paper>
    </Box>
  );
};

export default LaporanPage;