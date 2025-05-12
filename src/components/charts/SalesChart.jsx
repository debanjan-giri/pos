import { useState, useMemo, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Dropdown } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";

const SalesChart = () => {
  const [timeRange, setTimeRange] = useState("Today");
  const { darkMode } = useAppContext();

  // Memoize sales data to prevent unnecessary recalculations
  const salesData = useMemo(
    () => ({
      Today: {
        series: [
          {
            name: "Sales",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 180, 210],
          },
        ],
        categories: [
          "9AM",
          "10AM",
          "11AM",
          "12PM",
          "1PM",
          "2PM",
          "3PM",
          "4PM",
          "5PM",
          "6PM",
          "7PM",
          "8PM",
        ],
      },
      "This Week": {
        series: [
          {
            name: "Sales",
            data: [400, 430, 448, 470, 540, 580, 690],
          },
        ],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      "This Month": {
        series: [
          {
            name: "Sales",
            data: [
              2400, 1930, 2448, 2170, 1940, 2580, 2790, 3050, 3300, 2900, 3100,
              3500, 2800, 3200, 3000, 3400, 3600, 3700, 3800, 3500, 3300, 3200,
              3400, 3600, 3800, 4000, 4200, 4400, 4300, 4500,
            ],
          },
        ],
        categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
      },
      "This Year": {
        series: [
          {
            name: "Sales",
            data: [
              12400, 19300, 24480, 21700, 19400, 25800, 27900, 30500, 33000,
              29000, 31000, 35000,
            ],
          },
        ],
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    }),
    []
  );

  // Memoize chart options to prevent unnecessary recalculations
  const options = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        fontFamily: "var(--font-family)",
        foreColor: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "category",
        categories: salesData[timeRange].categories,
        labels: {
          style: {
            colors: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `₹${value}`,
          style: {
            colors: darkMode ? "var(--neutral-300)" : "var(--neutral-600)",
          },
        },
      },
      tooltip: {
        theme: darkMode ? "dark" : "light",
        y: {
          formatter: (value) => `₹${value}`,
        },
      },
      colors: ["var(--primary)"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: darkMode ? "var(--neutral-700)" : "var(--neutral-200)",
      },
    }),
    [timeRange, darkMode, salesData]
  );

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <Card className="dashboard-card">
      <Card.Body>
        <div className="dashboard-card-header">
          <div className="dashboard-card-title">Sales Overview</div>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              size="sm"
              id="dropdown-time-range"
            >
              {timeRange}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleTimeRangeChange("Today")}>
                Today
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeRangeChange("This Week")}>
                This Week
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleTimeRangeChange("This Month")}
              >
                This Month
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeRangeChange("This Year")}>
                This Year
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="dashboard-card-body">
          <ReactApexChart
            options={options}
            series={salesData[timeRange].series}
            type="area"
            height={350}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SalesChart);
