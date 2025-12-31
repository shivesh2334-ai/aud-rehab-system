import React, { useState } from 'react';
import { AlertCircle, User, Activity, Pill, Brain, Heart, TrendingUp, FileText, Users, Save, Plus, CheckCircle, ClipboardList } from 'lucide-react';

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
    setPatientData(prev => ({ ...prev, pawssScore: score, withdrawalRisk: score < 4 ? 'Low Risk' : 'High Risk' }));
  };

  const addMedication = () => {
    if (currentMedication.name) {
      setPatientData(prev => ({ ...prev, medications: [...prev.medications, { ...currentMedication, id: Date.now() }] }));
      setCurrentMedication({ name: '', dose: '', frequency: '' });
    }
  };

  const addNote = () => {
    if (currentNote.trim()) {
      setPatientData(prev => ({ ...prev, notes: [...prev.notes, { text: currentNote, date: new Date().toISOString(), id: Date.now() }] }));
      setCurrentNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none a4-container">
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AUD Clinical Management System</h1>
            <p className="text-slate-300 text-sm">Patient: {patientData.name || 'Unassigned'}</p>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 print:hidden">
            <FileText size={18}/> Export PDF
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b overflow-x-auto print:hidden">
          {['assessment', 'withdrawal', 'treatment', 'progress'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'assessment' && (
            <div className="space-y-6 animate-in fade-in">
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
                    <input type="text" value={patientData.name} onChange={(e) => setPatientData({...patientData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter patient name" />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" value={patientData.age} onChange={(e) => setPatientData({...patientData, age: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Age" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-500" /> Alcohol Consumption
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="number" placeholder="Drinks/Day" value={patientData.drinksPerDay} onChange={(e) => setPatientData({...patientData, drinksPerDay: e.target.value})} className="px-3 py-2 border rounded-md" />
                        <input type="number" placeholder="Years of use" value={patientData.durationOfUse} onChange={(e) => setPatientData({...patientData, durationOfUse: e.target.value})} className="px-3 py-2 border rounded-md" />
                        <input type="number" placeholder="Hrs since last drink" value={patientData.timeSinceLastDrink} onChange={(e) => setPatientData({...patientData, timeSinceLastDrink: e.target.value})} className="px-3 py-2 border rounded-md" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">PAWSS Risk Assessment</h3>
                    <button onClick={calculatePAWSS} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">Calculate PAWSS Score</button>
                    {patientData.pawssScore > 0 && (
                    <div className="mt-4 p-3 bg-white rounded-md">
                        <p className="text-sm text-gray-600">Score: <span className="font-bold text-lg">{patientData.pawssScore}</span></p>
                        <p className="text-sm text-gray-600">Risk: <span className={`font-bold ${patientData.withdrawalRisk === 'High Risk' ? 'text-red-600' : 'text-green-600'}`}>{patientData.withdrawalRisk}</span></p>
                    </div>
                    )}
                </div>
            </div>
          )}

          {activeTab === 'withdrawal' && (
            <div className="space-y-6">
                <div className={`p-4 border-l-4 ${patientData.withdrawalRisk === 'High Risk' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
                    <h3 className="font-bold">Protocol: {patientData.withdrawalRisk || 'Awaiting Assessment'}</h3>
                    <p className="text-sm">{patientData.withdrawalRisk === 'High Risk' ? 'Requires Inpatient Medical Detox' : 'Outpatient Management Possible'}</p>
                </div>
                <div className="bg-white border p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Pill size={18}/> Management Strategy</h4>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Thiamine 200-300mg daily (Oral/IV)</li>
                        <li>Monitor CIWA-Ar scores every 4-8 hours</li>
                        <li>{patientData.withdrawalRisk === 'High Risk' ? 'Benzodiazepines (Diazepam/Lorazepam) taper' : 'Gabapentin 300-600mg TID'}</li>
                    </ul>
                </div>
            </div>
          )}

          {activeTab === 'treatment' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-2">FDA Approved Pharmacotherapy</h4>
                        <p className="text-xs mb-3 text-blue-800">Select based on liver/renal function</p>
                        <div className="space-y-2">
                            <div className="bg-white p-2 rounded text-sm"><strong>Naltrexone:</strong> 50mg/day (Avoid if opioid use)</div>
                            <div className="bg-white p-2 rounded text-sm"><strong>Acamprosate:</strong> 666mg TID (Best for abstinence)</div>
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-900 mb-2">Psychosocial Support</h4>
                        <div className="space-y-1 text-sm">
                            <p>• Cognitive Behavioral Therapy (CBT)</p>
                            <p>• Motivational Enhancement (MET)</p>
                            <p>• 12-Step Facilitation</p>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
                <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-bold mb-4">Recovery Milestones & Notes</h3>
                    <textarea 
                        className="w-full border p-3 rounded mb-2 h-24"
                        placeholder="Add clinical observation..."
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                    />
                    <button onClick={addNote} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                        <Save size={16}/> Save Progress Note
                    </button>
                    <div className="mt-4 space-y-3">
                        {patientData.notes.map(note => (
                            <div key={note.id} className="border-b pb-2">
                                <span className="text-xs text-gray-400">{new Date(note.date).toLocaleDateString()}</span>
                                <p className="text-sm">{note.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AUDRehabSystem;
