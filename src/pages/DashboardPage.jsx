import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getLalins } from "../services/lalinService";
import { getGerbangs } from "../services/gerbangService";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [tanggal, setTanggal] = useState(null);
  const [dataLalin, setDataLalin] = useState([]);
  const [dataGerbang, setDataGerbang] = useState([]);

  const fetchData = async () => {
    try {
      const lalinRes = await getLalins(tanggal ? tanggal.format("YYYY-MM-DD") : "");
      const gerbangRes = await getGerbangs();
      setDataLalin(lalinRes?.data?.rows?.rows || []);
      setDataGerbang(gerbangRes?.data?.rows?.rows || []);
    } catch (err) {
      console.error("Gagal ambil data dashboard:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tanggal]);

  // Metode pembayaran chart
  const metodeChartData = [
    { name: "BCA", value: 0 },
    { name: "BRI", value: 0 },
    { name: "BNI", value: 0 },
    { name: "Mandiri", value: 0 },
    { name: "DKI", value: 0 },
    { name: "Flo", value: 0 },
    { name: "KTP", value: 0 },
  ];

  dataLalin.forEach((item) => {
    metodeChartData[0].value += item.eBca;
    metodeChartData[1].value += item.eBri;
    metodeChartData[2].value += item.eBni;
    metodeChartData[3].value += item.eMandiri;
    metodeChartData[4].value += item.eDKI;
    metodeChartData[5].value += item.eFlo;
    metodeChartData[6].value += item.DinasOpr + item.DinasMitra + item.DinasKary;
  });

  // Lalin per gerbang
  const gerbangMap = Object.fromEntries(dataGerbang.map((g) => [g.id, g.NamaGerbang]));
  const lalinPerGerbang = {};
  dataLalin.forEach((item) => {
    const key = item.IdGerbang;
    const jumlah = item.Tunai + item.DinasOpr + item.DinasMitra + item.DinasKary +
      item.eMandiri + item.eBri + item.eBni + item.eBca + item.eDKI + item.eFlo;
    if (!lalinPerGerbang[key]) lalinPerGerbang[key] = 0;
    lalinPerGerbang[key] += jumlah;
  });
  const gerbangChartData = Object.entries(lalinPerGerbang).map(([id, value]) => ({
    name: gerbangMap[id] || `Gerbang ${id}`,
    value,
  }));

  // Shift Pie Chart
  const shiftMap = { 1: 0, 2: 0, 3: 0 };
  dataLalin.forEach((item) => {
    const total = item.Tunai + item.DinasOpr + item.DinasMitra + item.DinasKary +
      item.eMandiri + item.eBri + item.eBni + item.eBca + item.eDKI + item.eFlo;
    shiftMap[item.Shift] += total;
  });
  const shiftChartData = Object.entries(shiftMap).map(([shift, value]) => ({
    name: `Shift ${shift}`,
    value,
  }));

  // Ruas Pie Chart
  const cabangMap = Object.fromEntries(dataGerbang.map((g) => [g.IdCabang, g.NamaCabang]));
  const ruasCount = {};
  dataLalin.forEach((item) => {
    const key = item.IdCabang;
    const total = item.Tunai + item.DinasOpr + item.DinasMitra + item.DinasKary +
      item.eMandiri + item.eBri + item.eBni + item.eBca + item.eDKI + item.eFlo;
    if (!ruasCount[key]) ruasCount[key] = 0;
    ruasCount[key] += total;
  });
  const ruasChartData = Object.entries(ruasCount).map(([id, value]) => ({
    name: cabangMap[id] || `Ruas ${id}`,
    value,
  }));

  const COLORS = ["#4C585B", "#7E99A3", "#A5BFCC", "#F4EDD3", "#8dd1e1", "#a4de6c", "#d0ed57"];

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Dashboard Lalu Lintas</Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pilih Tanggal"
              value={tanggal}
              onChange={(newVal) => setTanggal(newVal)}
              format="YYYY-MM-DD"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>

        </Stack>
      </Paper>

      <Stack spacing={10}>
        {/* BARIS 1 */}
        <Grid container spacing={4} justifyContent="space-between">
            <Paper sx={{ p: 2,width:'60%' }}>
                <Typography variant="h6" gutterBottom>Lalin per Metode Pembayaran</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={metodeChartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FDF5AA" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 2 ,width:'50%'}}>
                <Typography variant="h6" gutterBottom>Lalin per Gerbang</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gerbangChartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FDF5AA" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Grid>


        {/* BARIS 2 */}
        <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2,width:'100%', }}>
                    <Typography variant="h6" gutterBottom>Distribusi Shift</Typography>
                    <ResponsiveContainer minWidth={350} height={300}>
                        <PieChart>
                        <Pie
                            data={shiftChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {shiftChartData.map((_, index) => (
                            <Cell key={`cell-shift-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Distribusi Ruas</Typography>
                    <ResponsiveContainer minWidth={350} width="100%" height={300}>
                        <PieChart>
                        <Pie
                            data={ruasChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {ruasChartData.map((_, index) => (
                            <Cell key={`cell-ruas-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Grid>
        </Stack>
    </Box>
  );
};

export default DashboardPage;