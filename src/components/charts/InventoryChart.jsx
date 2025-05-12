import { useMemo, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";

const InventoryChart = () => {
  const { darkMode } = useAppContext();

  // Memoize chart options to prevent unnecessary recalculations
  const options = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
        fontFamily: "var(--font-family)",
        foreColor: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Rice",
          "Chicken",
          "Vegetables",
          "Spices",
          "Flour",
          "Oil",
          "Dairy",
          "Beverages",
        ],
        labels: {
          style: {
            colors: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
          },
        },
      },
      yaxis: {
        title: {
          text: "Quantity (kg/units)",
          style: {
            color: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
          },
        },
        labels: {
          style: {
            colors: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: darkMode ? "dark" : "light",
        y: {
          formatter: function (val) {
            return val + " units";
          },
        },
      },
      colors: ["var(--success)", "var(--danger)", "var(--warning)"],
      grid: {
        borderColor: darkMode ? "var(--neutral-700)" : "var(--neutral-200)",
      },
      legend: {
        labels: {
          colors: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
        },
      },
    }),
    [darkMode]
  );

  // Memoize series data to prevent unnecessary recalculations
  const series = useMemo(
    () => [
      {
        name: "Current Stock",
        data: [44, 55, 57, 56, 61, 58, 63, 60],
      },
      {
        name: "Low Stock Threshold",
        data: [20, 25, 20, 15, 30, 20, 25, 30],
      },
      {
        name: "Reorder Level",
        data: [10, 15, 10, 8, 15, 10, 12, 15],
      },
    ],
    []
  );

  return (
    <Card className="dashboard-card">
      <Card.Body>
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">Inventory Status</div>
        </div>
        <div className="dashboard-card-body">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(InventoryChart);
