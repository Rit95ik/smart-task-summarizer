import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

function App() {
  const [tasks, setTasks] = useState('');
  const [processedTasks, setProcessedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  
  // Check API connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking');
        // Try to connect to the API server
        const apiEndpoint = API_URL;
        console.log('Checking connection to:', apiEndpoint);
        const response = await axios.get(apiEndpoint, { 
          timeout: 5000,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (response.status === 200) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
        }
      } catch (err) {
        console.error('API connection check failed:', err);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
    
    // Set up periodic connection checks
    const intervalId = setInterval(checkConnection, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Sample tasks for demonstration
  const sampleTasks = [
    "Fix the bug in authentication system that's causing random logouts - multiple users reported this issue",
    "Update API documentation for new endpoints, currently outdated and causing confusion for the mobile team",
    "Schedule team meeting to discuss Q1 roadmap and prioritize features based on client feedback from last sprint",
    "Implement new analytics dashboard requested by marketing team, they need it for upcoming campaign",
    "Need to review and update the landing page design by next week, client mentioned they want it to be more modern and align with current branding"
  ];

  // Load sample tasks
  const loadSampleTasks = () => {
    setTasks(sampleTasks.join('\n\n'));
  };

  // Process tasks
  const processTasks = async () => {
    if (!tasks.trim()) {
      setError('Please enter at least one task');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Split tasks by double newline or single newline
      const taskList = tasks
        .split(/\n\n|\n/)
        .map(task => task.trim())
        .filter(task => task.length > 0);

      console.log('Tasks to process:', taskList);
      
      const apiEndpoint = API_URL;
      console.log(`Sending request to: ${apiEndpoint}/tasks`);

      // Send tasks to the server for processing
      const response = await axios.post(`${apiEndpoint}/tasks`, {
        tasks: taskList
      }, {
        // Ensure proper CORS handling
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      // Validate response format
      if (response.data && response.data.tasks) {
        // Ensure all tasks have the required properties
        const validatedTasks = response.data.tasks.map(task => {
          // If task is a string (shouldn't happen but just in case)
          if (typeof task === 'string') {
            return {
              summary: task,
              tags: ['unprocessed'],
              priority: 3
            };
          }
          
          // Ensure task has all required properties
          return {
            summary: task.summary || 'No summary available',
            tags: Array.isArray(task.tags) ? task.tags : ['untagged'],
            priority: typeof task.priority === 'number' ? task.priority : 3
          };
        });
        
        setProcessedTasks(validatedTasks);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error processing tasks:', err);
      
      // Provide more specific error messages
      if (err.code === 'ERR_NETWORK') {
        setError('Network error: Unable to connect to the server. Please check if the server is running and accessible.');
      } else if (err.response) {
        // The server responded with a status code outside the 2xx range
        setError(`Server error (${err.response.status}): ${err.response.data.error || 'Unknown server error'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection and the server status.');
      } else {
        // Something else happened while setting up the request
        setError(`Failed to process tasks: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (processedTasks.length === 0) {
      setError('No processed tasks to export');
      return;
    }

    // Create CSV content
    const csvHeader = 'Summary,Tags,Priority\n';
    const csvContent = processedTasks.map(task => {
      const summary = `"${task.summary.replace(/"/g, '""')}"`;
      const tags = `"${task.tags.join(', ')}"`;
      return `${summary},${tags},${task.priority}`;
    }).join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'processed_tasks.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Smart Task Summarizer</h1>
        <p>AI-powered task summarization, tagging, and prioritization</p>
        <div className={`connection-status ${connectionStatus}`}>
          {connectionStatus === 'connected' && '✅ Connected to server'}
          {connectionStatus === 'checking' && '⏳ Checking connection...'}
          {connectionStatus === 'error' && '❌ Connection error - Server may be unavailable'}
        </div>
      </header>

      <div className="main-content">
        <section className="input-section">
          <h2>Input Tasks</h2>
          <div className="textarea-container">
            <textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="Enter your tasks here, one per line or separated by blank lines..."
            />
          </div>
          <div className="button-group">
            <button className="primary-button" onClick={processTasks} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Process Tasks'}
            </button>
            <button className="secondary-button" onClick={loadSampleTasks}>
              Load Sample Tasks
            </button>
            <button className="accent-button" onClick={exportToCSV} disabled={processedTasks.length === 0}>
              Export to CSV
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="output-section">
          <h2>Processed Tasks</h2>
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : processedTasks.length > 0 ? (
            <div className="task-grid">
              {processedTasks.map((task, index) => (
                <div key={index} className="task-card">
                  <h3>Task {index + 1}</h3>
                  <div className="task-summary">{task.summary}</div>
                  <div className="task-tags">
                    {task.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="task-priority">
                    <span className="priority-label">Priority:</span>
                    <span className={`priority-value priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No processed tasks yet. Enter some tasks and click "Process Tasks".</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;