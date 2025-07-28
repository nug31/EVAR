import React, { useState } from 'react';
import { 
  Wrench, 
  Battery, 
  Car, 
  Zap, 
  CheckCircle, 
  Clock,
  Camera,
  Play,
  Book,
  AlertTriangle
} from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  category: 'battery' | 'motor' | 'charging' | 'general';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  steps: string[];
  completed: boolean;
}

const Maintenance: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      title: 'Battery Health Check',
      category: 'battery',
      difficulty: 'Easy',
      duration: '15 min',
      description: 'Check battery health and charging efficiency with AR guidance.',
      steps: [
        'Access vehicle diagnostic mode',
        'Connect to charging port',
        'Monitor battery temperature using AR overlay',
        'Check cell voltage balance',
        'Review charging curve data'
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Tire Pressure Check',
      category: 'general',
      difficulty: 'Easy',
      duration: '10 min',
      description: 'Ensure optimal tire pressure for maximum range.',
      steps: [
        'Locate tire pressure sensors',
        'Use AR to identify correct PSI values',
        'Check each tire pressure',
        'Adjust if necessary',
        'Reset TPMS system'
      ],
      completed: true
    },
    {
      id: '3',
      title: 'Charging Port Inspection',
      category: 'charging',
      difficulty: 'Medium',
      duration: '20 min',
      description: 'Inspect charging port for damage and proper connection.',
      steps: [
        'Power down charging system',
        'Visually inspect port for damage',
        'Check connector pins with AR magnification',
        'Test door mechanism',
        'Clean contacts if needed'
      ],
      completed: false
    },
    {
      id: '4',
      title: 'Coolant Level Check',
      category: 'motor',
      difficulty: 'Medium',
      duration: '25 min',
      description: 'Monitor coolant levels for battery and motor cooling systems.',
      steps: [
        'Locate coolant reservoirs using AR',
        'Check minimum/maximum levels',
        'Inspect for leaks',
        'Test coolant quality',
        'Top up if required'
      ],
      completed: false
    }
  ];

  const categoryIcons = {
    battery: Battery,
    motor: Car,
    charging: Zap,
    general: Wrench
  };

  const categoryColors = {
    battery: 'text-green-400',
    motor: 'text-blue-400',
    charging: 'text-yellow-400',
    general: 'text-purple-400'
  };

  const startARGuide = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setActiveStep(0);
    // In a real implementation, this would initialize AR guidance
    alert(`AR Maintenance Guide for "${task.title}" would start here`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            AR <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Maintenance</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Interactive maintenance guides with step-by-step AR instructions to keep your EV in perfect condition.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Task List */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Maintenance Tasks</h2>
                <div className="text-sm text-slate-400">
                  {maintenanceTasks.filter(t => t.completed).length}/{maintenanceTasks.length} completed
                </div>
              </div>

              <div className="space-y-4">
                {maintenanceTasks.map((task) => {
                  const IconComponent = categoryIcons[task.category];
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedTask?.id === task.id
                          ? 'bg-orange-500/20 border-orange-500/50'
                          : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-slate-800 ${categoryColors[task.category]}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{task.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                          </div>
                        </div>
                        {task.completed && (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-slate-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {task.duration}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            task.difficulty === 'Easy' 
                              ? 'bg-green-500/20 text-green-400'
                              : task.difficulty === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {task.difficulty}
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startARGuide(task);
                          }}
                          className="inline-flex items-center px-3 py-1 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                        >
                          <Camera className="w-3 h-3 mr-1" />
                          AR Guide
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="lg:col-span-7">
            {selectedTask ? (
              <div className="space-y-6">
                {/* Task Header */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedTask.title}</h2>
                      <p className="text-slate-300">{selectedTask.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => startARGuide(selectedTask)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Start AR Guide
                      </button>
                      <button className="inline-flex items-center px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all duration-200">
                        <Play className="w-4 h-4 mr-2" />
                        Video Tutorial
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{selectedTask.duration}</div>
                      <div className="text-sm text-slate-400">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${
                        selectedTask.difficulty === 'Easy' 
                          ? 'text-green-400'
                          : selectedTask.difficulty === 'Medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`} />
                      <div className="text-lg font-bold text-white">{selectedTask.difficulty}</div>
                      <div className="text-sm text-slate-400">Difficulty</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <Book className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{selectedTask.steps.length}</div>
                      <div className="text-sm text-slate-400">Steps</div>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Guide */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Step-by-Step Guide</h3>
                  
                  <div className="space-y-4">
                    {selectedTask.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 ${
                          index === activeStep
                            ? 'bg-orange-500/20 border border-orange-500/50'
                            : index < activeStep
                            ? 'bg-green-500/20 border border-green-500/50'
                            : 'bg-slate-700/30 border border-slate-600/30'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === activeStep
                            ? 'bg-orange-500 text-white'
                            : index < activeStep
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-600 text-slate-300'
                        }`}>
                          {index < activeStep ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            index === activeStep ? 'text-orange-300' :
                            index < activeStep ? 'text-green-300' : 'text-slate-300'
                          }`}>
                            {step}
                          </p>
                          {index === activeStep && (
                            <div className="mt-3 flex items-center space-x-2">
                              <button 
                                onClick={() => alert('AR overlay would show detailed instructions')}
                                className="inline-flex items-center px-3 py-1 text-xs bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-200"
                              >
                                <Camera className="w-3 h-3 mr-1" />
                                View in AR
                              </button>
                              <button
                                onClick={() => setActiveStep(Math.min(activeStep + 1, selectedTask.steps.length - 1))}
                                className="inline-flex items-center px-3 py-1 text-xs bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-500 transition-all duration-200"
                              >
                                Next Step
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeStep > 0 && (
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        className="px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all duration-200"
                      >
                        Previous Step
                      </button>
                      {activeStep === selectedTask.steps.length - 1 && (
                        <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200">
                          Mark as Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12 text-center">
                <Wrench className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Select a Maintenance Task</h2>
                <p className="text-slate-400">
                  Choose a maintenance task from the list to view detailed AR-guided instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;