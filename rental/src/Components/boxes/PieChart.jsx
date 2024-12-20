import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAuth } from '../admin/AuthProvider';

const OccupancyCharts = () => {
  const { currentBuilding ,buildings } = useAuth();
  const building = buildings?.buildings?.find(b => b.name === currentBuilding);
  // console.log("Tenants:", building);
  // const [occupancyData, setOccupancyData] = useState(null);
  const [occupancyData, setOccupancyData] = useState({
    totalUnits: 100,
    occupiedUnits: 75,
    vacantUnits: 25,
    tenantTypeDistribution: [
      { name: 'Family', value: 40 },
      { name: 'Single Professional', value: 30 },
      { name: 'Student', value: 20 },
      { name: 'Senior', value: 10 }
    ],
    leaseStatusDistribution: [
      { name: 'Active Lease', value: 65 },
      { name: 'Month-to-Month', value: 10 },
      { name: 'Pending Renewal', value: 15 },
      { name: 'Terminated', value: 10 }
    ]
  });

  useEffect(() => {
    const fetchOccupancyData = async () => {
      try {
        const response = await fetch('/api/occupancy/summary');
        const data = await response.json();
        setOccupancyData(data);
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
      }
    };

    fetchOccupancyData();
  }, []);

  // Default colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Render function for custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white', 
          padding: '10px', 
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <p>{`${data.name}: ${data.value} (${data.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // If data is not yet loaded
  if (!occupancyData) {
    return <div>Loading occupancy data...</div>;
  }

  return (
    <div className="occupancy-charts-container" >
      <div className="chart-section">
        <h3 style={{ textAlign: 'center' }}>Property Occupancy Breakdown</h3>
        <div className="charts-grid">
          {/* Occupancy Status Pie Chart */}
          <div className="chart-card">
            <h4>Occupancy Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { 
                      name: 'Occupied', 
                      value: occupancyData.occupiedUnits, 
                      percentage: ((occupancyData.occupiedUnits / occupancyData.totalUnits) * 100).toFixed(1)
                    },
                    { 
                      name: 'Vacant', 
                      value: occupancyData.vacantUnits, 
                      percentage: ((occupancyData.vacantUnits / occupancyData.totalUnits) * 100).toFixed(1)
                    }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Occupied', value: occupancyData.occupiedUnits },
                    { name: 'Vacant', value: occupancyData.vacantUnits }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tenant Type Pie Chart */}
          <div className="chart-card">
            <h4>Tenant Type Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData.tenantTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.tenantTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lease Status Pie Chart */}
          <div className="chart-card">
            <h4>Lease Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData.leaseStatusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.leaseStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyCharts;