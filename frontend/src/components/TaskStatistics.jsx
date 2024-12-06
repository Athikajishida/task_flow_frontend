import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TaskStatistics = () => {
  // Get tasks from Redux store
  const tasks = useSelector((state) => state.tasks.items);

  // Memoized calculations to prevent unnecessary re-renders
  const statistics = useMemo(() => {
    // Total tasks
    const totalTasks = tasks.length;

    // Completed and pending tasks
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;

    // Tasks by day of week (assuming task creation date is used)
    const tasksByDay = tasks.reduce((acc, task) => {
      const date = new Date(task.created_at || new Date());
      const day = date.toLocaleString('en-US', { weekday: 'short' });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    // Prepare chart data for days of week
    const chartData = [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ].map(day => ({
      day,
      count: tasksByDay[day] || 0
    }));

    // Pie chart data for completion status
    const pieChartData = [
      { name: 'Completed', value: completedTasks },
      { name: 'Pending', value: pendingTasks },
    ];

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      chartData,
      pieChartData
    };
  }, [tasks]);

  const COLORS = ['#4CAF50', '#FFC107'];

  return (
    <div className="mt-8 bg-orange-50 shadow-lg rounded-lg p-6 border border-orange-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-orange-800">Task Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Tasks" 
          value={statistics.totalTasks} 
          color="bg-orange-100 text-orange-800" 
          icon="📊" 
        />
        <StatCard 
          title="Completed" 
          value={statistics.completedTasks} 
          color="bg-green-100 text-green-800" 
          icon="✅" 
        />
        <StatCard 
          title="Pending" 
          value={statistics.pendingTasks} 
          color="bg-yellow-100 text-yellow-800" 
          icon="⏳" 
        />
        <StatCard 
          title="Last 7 Days" 
          value={statistics.totalTasks} 
          color="bg-orange-200 text-orange-900" 
          icon="📅" 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8">
        <div className="bg-orange-50 p-4 rounded-lg lg:col-span-3 border border-orange-200">
          <h3 className="font-medium mb-4 text-center text-orange-700">Tasks by Day of Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#orange-300" />
              <XAxis 
                dataKey="day" 
                stroke="#orange-600" 
                tick={{fill: '#orange-600'}}
                tickLine={{stroke: '#orange-600'}}
                axisLine={{stroke: '#orange-600'}}
              />
              <YAxis 
                stroke="#orange-600"
                tick={{fill: '#orange-600'}}
                tickLine={{stroke: '#orange-600'}}
                axisLine={{stroke: '#orange-600'}}
              />
              <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#FF9800" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg lg:col-span-5 border border-orange-200">
          <h3 className="font-medium mb-4 text-center text-orange-700">Task Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statistics.pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#FF9800"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statistics.pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div className={`${color} rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105`}>
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-medium text-center text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default TaskStatistics;