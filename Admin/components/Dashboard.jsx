import React, { useEffect,useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { ApiClient } from 'adminjs'

const pieData = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
];

const total = pieData.reduce((acc, item) => acc + item.value, 0);
const getArcLabel = (params) => `${((params.value / total) * 100).toFixed(0)}%`;

const chartContainerStyle = {
  background: '#fff',
  // borderRadius: '12px',
  boxShadow: '0 0 25px 5px rgba(0,0,0,0.1)',
  padding: '10px',
  margin: '10px',
};

const Dashboard = () => {
  const api = new ApiClient()
  const [data,setData] = useState(null)
  const [students,setStudents] = useState([])
  const [teachers,setTeachers] = useState([])
  const [parents,setParents] = useState([])


  useEffect(()=>{
    getData()
  },[])

  async function getData()
  {
    let resp = await api.getDashboard()
    console.log(resp.data)
    
    setData(resp.data)

    const students = resp.data.filter(i => i.Role == "Student")
    const teachers = resp.data.filter(i => i.Role == "Teacher")
    const parents = resp.data.filter(i => i.Role == "parent")

    setStudents(students)
    setTeachers(teachers)
    setParents(parents)

  }


  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100vh' }}>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Dashboard Overview</h2> */}
      <div style={{display:'flex',flexDirection:'row',gap:20,marginLeft:10}}>
        <div style={styles.card}>
          <div style={styles.content}>
            <h2 style={styles.value}>{data ? data.length : 0}</h2>
            <p style={styles.title}>Total Users</p>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.content}>
            <h2 style={styles.value}>{students ? students.length : 0}</h2>
            <p style={styles.title}>Total Students</p>
          </div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row',gap:20,marginLeft:10,marginTop:20}}>
        <div style={styles.card}>
          <div style={styles.content}>
            <h2 style={styles.value}>{teachers ? teachers.length : 0}</h2>
            <p style={styles.title}>Total Qaris</p>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.content}>
            <h2 style={styles.value}>{parents ? parents.length : 0}</h2>
            <p style={styles.title}>Total Parents</p>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Dashboard;

const styles = {
  card: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position: 'relative',
    flex:1,
    height: 150,
    padding: '20px 16px',
    // borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  topRight: {
    position: 'absolute',
    top: 8,
    right: 10
  },
  change: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  value: {
    margin: 0,
    marginBottom : 20,
    fontSize: 28,
    color: '#2c3e50'
  },
  title: {
    margin: 0,
    fontSize: 18,
    color: '#7f8c8d'
  }
};