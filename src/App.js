import React, { useState } from 'react';
import { AlertCircle, User, Activity, Pill, Brain, Heart, TrendingUp, FileText, Users, Save, Plus, CheckCircle } from 'lucide-react';

const AUDRehabSystem = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [patientData, setPatientData] = useState({
    name: '', age: '', gender: '', drinksPerDay: '', durationOfUse: '',
    timeSinceLastDrink: '', pawssScore: 0, hba1c: '', bloodPressure: '',
    comorbidConditions: [], withdrawalRisk: '', medications: [],
    psychosocialInterventions: [], notes: []
  });

  const [currentMedication, setCurrentMedication] = useState({ name: '', dose: '', frequency: '' });
  const [currentNote, setCurrentNote] = useState('');

  const calculatePAWSS = () => {
    let score = 0;
    if (parseInt(patientData.drinksPerDay) > 8) score += 2;
    if (parseInt(patientData.durationOfUse) > 10) score += 1;
    if (patientData.comorbidConditions.includes('previousWithdrawal')) score += 2;
    if (patientData.comorbidConditions.includes('previousSeizure')) score += 2;
    return score;
  };

  const determineWithdrawalRisk = (score) => score < 4 ? 'Low Risk' : 'High Risk';

  const addMedication = () => {
    if (currentMedication.name && currentMedication.dose) {
      setPatientData({
        ...patientData,
        medications: [...patientData.medications, { ...currentMedication, id: Date.now() }]
      });
      setCurrentMedication({ name: '', dose: '', frequency: '' });
    }
  };

  const addNote = () => {
    if (currentNote.trim()) {
      setPatientData({
        ...patientData,
        notes: [...patientData.notes, { text: currentNote, date: new Date().toISOString(), id: Date.now() }]
      });
      setCurrentNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center">
              <Activity className="w-8 h-8 mr-3" />
              AUD Rehabilitation Management System
            </h1>
            <p className="mt-2 text-blue-100">Comprehensive treatment planning and progress tracking</p>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'assessment', label: 'Assessment', icon: User },
                { id: 'withdrawal', label: 'Withdrawal', icon: AlertCircle },
                { id: 'treatment', label: 'Treatment', icon: Pill },
                { id: 'progress', label: 'Progress', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'assessment' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Initial Assessment Phase</h3>
                      <p className="text-sm text-blue-800 mt-1">Conduct comprehensive evaluation using DSM-5-TR criteria</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={patientData.name}
                      onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Age"
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-500" />
                    Alcohol Consumption Assessment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Drinks per Day</label>
                      <input
                        type="number"
                        value={patientData.drinksPerDay}
                        onChange={(e) => setPatientData({...patientData, drinksPerDay: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Use (years)</label>
                      <input
                        type="number"
                        value={patientData.durationOfUse}
                        onChange={(e) => setPatientData({...patientData, durationOfUse: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Years"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hours Since Last Drink</label>
                      <input
                        type="number"
                        value={patientData.timeSinceLastDrink}
                        onChange={(e) => setPatientData({...patientData, timeSinceLastDrink: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Hours"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                    Medical Comorbidities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HbA1c (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={patientData.hba1c}
                        onChange={(e) => setPatientData({...patientData, hba1c: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 7.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (mmHg)</label>
                      <input
                        type="text"
                        value={patientData.bloodPressure}
                        onChange={(e) => setPatientData({...patientData, bloodPressure: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 140/90"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comorbid Conditions</label>
                    <div className="space-y-2">
                      {['diabetes', 'hypertension', 'depression', 'anxiety', 'previousWithdrawal', 'previousSeizure'].map(condition => (
                        <label key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={patientData.comorbidConditions.includes(condition)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPatientData({...patientData, comorbidConditions: [...patientData.comorbidConditions, condition]});
                              } else {
                                setPatientData({...patientData, comorbidConditions: patientData.comorbidConditions.filter(c => c !== condition)});
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 capitalize">{condition.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">PAWSS Risk Assessment</h3>
                  <button
                    onClick={() => {
                      const score = calculatePAWSS();
                      const risk = determineWithdrawalRisk(score);
                      setPatientData({...patientData, pawssScore: score, withdrawalRisk: risk});
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Calculate PAWSS Score
                  </button>
                  {patientData.pawssScore > 0 && (
                    <div className="mt-4 p-3 bg-white rounded-md">
                      <p className="text-sm text-gray-600">PAWSS Score: <span className="font-bold text-lg">{patientData.pawssScore}</span></p>
                      <p className="text-sm text-gray-600 mt-1">Withdrawal Risk: <span className={`font-bold ${patientData.withdrawalRisk === 'High Risk' ? 'text-red-600' : 'text-green-600'}`}>{patientData.withdrawalRisk}</span></p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'withdrawal' && (
              <div className="space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Withdrawal Management Phase</h3>
                      <p className="text-sm text-amber-800 mt-1">Based on PAWSS score: {patientData.withdrawalRisk || 'Not assessed'}</p>
                    </div>
                  </div>
                </div>

                {patientData.withdrawalRisk === 'Low Risk' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Outpatient Management Protocol</h3>
                    <ul className="text-sm text-green-800 space-y-1 ml-4">
                      <li>• Gabapentin 300-600 mg three times daily, or</li>
                      <li>• Carbamazepine 200 mg every 6-8 hours, or</li>
                      <li>• Clonidine with close monitoring</li>
                      <li>• Thiamine 200-300 mg daily (oral)</li>
                      <li>• Close outpatient monitoring</li>
                    </ul>
                  </div>
                )}

                {patientData.withdrawalRisk === 'High Risk' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Inpatient Management Protocol</h3>
                    <ul className="text-sm text-red-800 space-y-1 ml-4">
                      <li>• Diazepam 10 mg every 6-8 hours, or</li>
                      <li>• Lorazepam 1-4 mg every 4-8 hours</li>
                      <li>• CIWA-Ar monitoring protocol</li>
                      <li>• Thiamine 200-300 mg daily (parenteral)</li>
                      <li>• Electrolyte monitoring and correction</li>
                      <li>• Blood glucose and BP monitoring</li>
                    </ul>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-blue-500" />
                    Current Medications
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={currentMedication.name}
                        onChange={(e) => setCurrentMedication({...currentMedication, name: e.target.value})}
                        placeholder="Medication name"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={currentMedication.dose}
                        onChange={(e) => setCurrentMedication({...currentMedication, dose: e.target.value})}
                        placeholder="Dose"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={currentMedication.frequency}
                        onChange={(e) => setCurrentMedication({...currentMedication, frequency: e.target.value})}
                        placeholder="Frequency"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      onClick={addMedication}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Medication
                    </button>
                  </div>

                  {patientData.medications.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {patientData.medications.map(med => (
                        <div key={med.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{med.name}</p>
                            <p className="text-sm text-gray-600">{med.dose} - {med.frequency}</p>
                          </div>
                          <button
                            onClick={() => setPatientData({...patientData, medications: patientData.medications.filter(m => m.id !== med.id)})}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-semibold text-green-900">Ongoing Treatment & Recovery Phase</h3>
                      <p className="text-sm text-green-800 mt-1">Initiate pharmacotherapy and psychosocial interventions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">First-Line Pharmacotherapy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <h4 className="font-bold">Naltrexone</h4>
                      <p className="text-sm">50mg daily. Reduces cravings and heavy drinking.</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-bold">Acamprosate</h4>
                      <p className="text-sm">666mg TID. Best for maintaining abstinence.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-500" />
                    Psychosocial Interventions
                  </h3>
                  <div className="space-y-2">
                    {['Cognitive Behavioral Therapy (CBT)', 'Motivational Enhancement Therapy (MET)', '12-Step Facilitation', 'Family Therapy'].map(therapy => (
                      <div key={therapy} className="flex items-center p-2 bg-gray-50 rounded">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{therapy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'progress' && (
              <div className="space-y-4">
                <textarea 
                  className="w-full p-3 border rounded-md" 
                  rows="4" 
                  placeholder="Enter clinical notes..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                />
                <button onClick={addNote} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save Note</button>
                <div className="mt-4">
                   {patientData.notes.map(n => (
                     <div key={n.id} className="p-3 border-b text-sm">
                       <span className="text-gray-400">{new Date(n.date).toLocaleDateString()}</span>
                       <p className="mt-1">{n.text}</p>
                     </div>
                   ))}
              
