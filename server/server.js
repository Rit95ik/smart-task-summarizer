require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5174', 
    'https://smart-task-summarizer-frontend.loca.lt', 
    'https://smart-task-summarizer-app.loca.lt', 
    'https://focuses-feels-dpi-optimization.trycloudflare.com', 
    'https://defend-during-vanilla-bullet.trycloudflare.com', 
    'https://enable-physiology-programme-examples.trycloudflare.com', 
    'https://heath-sharing-safely-hope.trycloudflare.com',
    'https://fix-list-lexmark-techno.trycloudflare.com',
    // Allow your Vercel frontend domain (will be updated after deployment)
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,
    /\.railway\.app$/
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Smart Task Summarizer API is running');
});

// Process tasks endpoint
app.post('/tasks', async (req, res) => {
  try {
    console.log('Received request to /tasks endpoint');
    const { tasks } = req.body;
    
    if (!tasks || !Array.isArray(tasks)) {
      console.error('Invalid request format: tasks must be an array');
      return res.status(400).json({ error: 'Invalid request format: tasks must be an array' });
    }

    console.log(`Processing ${tasks.length} tasks`);
    
    // Process each task and collect results
    const processedTasks = [];
    
    for (const task of tasks) {
      try {
        const processedTask = await processTask(task);
        processedTasks.push(processedTask);
      } catch (taskError) {
        console.error(`Error processing task: ${task}`, taskError);
        // Add a fallback processed task with error information
        processedTasks.push({
          summary: task.substring(0, 100) + (task.length > 100 ? '...' : ''),
          tags: ['error'],
          priority: 3
        });
      }
    }
    
    console.log('Successfully processed all tasks');
    res.json({ tasks: processedTasks });
  } catch (error) {
    console.error('Error in /tasks endpoint:', error);
    res.status(500).json({ error: 'Failed to process tasks' });
  }
});

// Function to process a single task using AI
async function processTask(task) {
  try {
    console.log(`Processing task: ${task.substring(0, 50)}...`);
    
    // If API key is not set, use local processing
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      console.log('Using local processing (API key not configured)');
      return processTaskLocally(task);
    }
    
    // Prepare the prompt for the AI
    const prompt = `
    You are a task processing assistant. Given the following task, please:
    1. Create a concise summary (max 100 characters)
    2. Extract 1-3 relevant tags (single words)
    3. Assign a priority from 1-5 (1 being lowest, 5 being highest)
    
    Format your response as a JSON object with the following structure:
    {
      "summary": "concise summary",
      "tags": ["tag1", "tag2"],
      "priority": priority_number
    }
    
    Task: ${task}
    `;
    
    // Call the OpenRouter API with DeepSeek model
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.MODEL || 'deepseek/deepseek-coder-33b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that processes tasks.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );
    
    // Parse the AI response
    const aiResponse = response.data.choices[0].message.content;
    console.log('AI Response:', aiResponse);
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      return processTaskLocally(task);
    }
    
    // Validate the response format
    if (!parsedResponse.summary || !parsedResponse.tags || !parsedResponse.priority) {
      console.warn('AI response missing required fields, using local processing');
      return processTaskLocally(task);
    }
    
    return {
      summary: parsedResponse.summary,
      tags: parsedResponse.tags,
      priority: parsedResponse.priority
    };
  } catch (error) {
    console.error('Error calling AI API:', error.message);
    // Fallback to local processing
    return processTaskLocally(task);
  }
}

// Fallback function for local task processing
function processTaskLocally(task) {
  console.log('Using local processing for task');
  
  // Extract potential tags based on common keywords
  const potentialTags = ['bug', 'feature', 'documentation', 'meeting', 'design', 'testing', 'urgent', 'marketing'];
  const taskLower = task.toLowerCase();
  
  const tags = potentialTags.filter(tag => taskLower.includes(tag));
  
  // If no tags were found, add a default tag
  if (tags.length === 0) {
    if (taskLower.includes('fix') || taskLower.includes('issue') || taskLower.includes('problem')) {
      tags.push('bug');
    } else if (taskLower.includes('create') || taskLower.includes('implement') || taskLower.includes('add')) {
      tags.push('feature');
    } else if (taskLower.includes('discuss') || taskLower.includes('talk') || taskLower.includes('sync')) {
      tags.push('meeting');
    } else {
      tags.push('task');
    }
  }
  
  // Limit to 3 tags maximum
  const finalTags = tags.slice(0, 3);
  
  // Calculate priority based on keywords
  let priority = 3; // Default medium priority
  
  if (taskLower.includes('urgent') || taskLower.includes('asap') || taskLower.includes('critical')) {
    priority = 5;
  } else if (taskLower.includes('important') || taskLower.includes('high')) {
    priority = 4;
  } else if (taskLower.includes('low') || taskLower.includes('when you have time')) {
    priority = 2;
  } else if (taskLower.includes('trivial') || taskLower.includes('minor')) {
    priority = 1;
  }
  
  // Create a simple summary (first 100 chars)
  const summary = task.length > 100 ? task.substring(0, 97) + '...' : task;
  
  return {
    summary,
    tags: finalTags,
    priority
  };
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});