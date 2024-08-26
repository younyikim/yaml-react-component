import { useState, useEffect } from 'react';
import { eventBus } from 'yaml-react-component';
import Header from '../header';
import MainContent from '../mainContent';
import Footer from '../footer';
import { DashboardProps } from '../types';
import './style.css';

const Dashboard = ( ) => {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const handleDataLoaded = () => {
      console.log('handleDataLoaded');
    };

    eventBus.subscribe('DATA_LOADED', handleDataLoaded);
    eventBus.publish('DASHBOARD_LOADED', {});

    return () => {
      eventBus.unsubscribe('DATA_LOADED', handleDataLoaded);
    };
  }, []);

  return (
    <div data-testid="Dashboard" className="dashboard">
      <h1>Dashboard Component</h1>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
};

export default Dashboard;
