'use client';

import React, { useState, useMemo } from 'react';
import { 
  Anchor, 
  LifeBuoy, 
  ClipboardList, 
  TrendingUp, 
  Calculator, 
  MenuSquare,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Send,
  Sparkles,
  Loader2,
  ChefHat,
  Lock,
  Skull,
  Map,
  Crown,
  Search,
  DollarSign,
  BarChart3,
  Percent
} from 'lucide-react';

export default function PrivateerApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Premium State
  const [isPremium, setIsPremium] = useState(false);

  // Dashboard Interactive States
  const [isGeneratingActions, setIsGeneratingActions] = useState(false);
  const [actionItems, setActionItems] = useState([
    { id: 1, task: "Review Meat/Seafood invoices from Trenton Produce.", status: "pending" },
    { id: 2, task: "Update perpetual inventory sheet for high-variance items.", status: "pending" },
    { id: 3, task: "Re-map Recipe #12 (Ribeye) - yield dropping below 90%.", status: "critical" },
    { id: 4, task: "Complete End of Period Accounting Checklist.", status: "done" }
  ]);

  const toggleTaskStatus = (id) => {
    setActionItems(items => items.map(item => {
      if (item.id === id) {
        if (item.status === 'done') return { ...item, status: 'pending' };
        if (item.status === 'pending') return { ...item, status: 'done' };
        if (item.status === 'critical') return { ...item, status: 'done' };
      }
      return item;
    }));
  };
  
  // Recipe Mapping Interactive States
  const [recipeIdea, setRecipeIdea] = useState('');
  const [isOptimizingRecipe, setIsOptimizingRecipe] = useState(false);
  const [dynamicMenuPrice, setDynamicMenuPrice] = useState(38.00);

  // Inventory Interactive States
  const [inventorySearch, setInventorySearch] = useState('');

  // Prime Cost Interactive States
  const [primeData, setPrimeData] = useState({
    foodSales: 15400, bevSales: 4600,
    foodCogs: 5200, bevCogs: 950,
    hourlyLabor: 4800, salariedLabor: 1500, taxesBenefits: 1260
  });

  // Plank Test States
  const [plankStep, setPlankStep] = useState(0);
  const [plankAnswers, setPlankAnswers] = useState([]);
  const [plankResult, setPlankResult] = useState(null);
  const [isAnalyzingPlank, setIsAnalyzingPlank] = useState(false);

  // Expanded Mock Data
  const inventoryMaster = [
    { id: '001', desc: 'Ribeye 12oz', pack: '14 lbs', unit: 'LB', price: 14.50, yield: 0.95, stock: 'Low' },
    { id: '002', desc: 'Romaine Hearts 24ct', pack: '24 ct', unit: 'CS', price: 32.00, yield: 0.85, stock: 'Healthy' },
    { id: '003', desc: 'Salmon Filet', pack: '10 lbs', unit: 'LB', price: 11.25, yield: 0.90, stock: 'Healthy' },
    { id: '004', desc: 'Frying Oil', pack: '35 lbs', unit: 'JUG', price: 42.00, yield: 1.00, stock: 'Critical' },
    { id: '005', desc: 'Lemons 115ct', pack: '115 ct', unit: 'CS', price: 23.00, yield: 0.98, stock: 'Healthy' },
    { id: '006', desc: 'Mushroom Med BTN 10#', pack: '10 lbs', unit: 'BX', price: 15.25, yield: 0.92, stock: 'Low' },
  ];

  const filteredInventory = inventoryMaster.filter(item => 
    item.desc.toLowerCase().includes(inventorySearch.toLowerCase()) || 
    item.id.includes(inventorySearch)
  );

  const mockRecipe = {
    name: "Seared Ribeye Plate", currentCost: 18.50, 
    ingredients: [
      { name: "Ribeye 12oz", cost: 14.50 }, { name: "Asparagus (4oz)", cost: 2.10 },
      { name: "Garlic Mash", cost: 1.40 }, { name: "Compound Butter", cost: 0.50 }
    ]
  };

  const dynamicFoodCostPct = ((mockRecipe.currentCost / dynamicMenuPrice) * 100).toFixed(1);
  const dynamicGrossProfit = (dynamicMenuPrice - mockRecipe.currentCost).toFixed(2);

  const plankQuestions = [
    { question: "How accurately do you track your Weekly Prime Cost?", options: ["We don't track it weekly.", "We use rough estimates at month's end.", "To the penny, reviewed every Monday."] },
    { question: "How often does your team complete a full physical inventory?", options: ["Rarely, mostly guessing.", "Once a month for accounting.", "Weekly or perpetually for high-cost items."] },
    { question: "What is your kitchen's adherence to recipe mapping?", options: ["Chefs 'wing it' mostly.", "We have a book, but it gathers dust.", "Strictly followed, updated, and costed."] },
    { question: "How is your current operating cash flow?", options: ["Robbing Peter to pay Paul.", "Breaking even, barely staying afloat.", "Profitable, putting money in the war chest."] }
  ];

  // Derived Prime Cost Calculations
  const totalSales = primeData.foodSales + primeData.bevSales;
  const totalCogs = primeData.foodCogs + primeData.bevCogs;
  const totalLabor = primeData.hourlyLabor + primeData.salariedLabor + primeData.taxesBenefits;
  const totalPrimeCost = totalCogs + totalLabor;
  
  const cogsPct = totalSales ? ((totalCogs / totalSales) * 100).toFixed(1) : 0;
  const laborPct = totalSales ? ((totalLabor / totalSales) * 100).toFixed(1) : 0;
  const primeCostPct = totalSales ? ((totalPrimeCost / totalSales) * 100).toFixed(1) : 0;

  // --- GEMINI API HELPER ---
  const callGemini = async (prompt, isJson = false) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: "You are The Captain, an expert restaurant turnaround consultant with 20+ years of gritty operations experience. You provide actionable, professional, and slightly nautical-themed advice to distressed restaurant operators. Never break character." }]
      }
    };

    if (isJson) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY", items: { type: "OBJECT", properties: { task: { type: "STRING" }, status: { type: "STRING" } } }
        }
      };
    }

    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return isJson ? JSON.parse(text) : text;
      } catch (e) {
        if (i === 4) throw e;
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
      }
    }
  };

  const generateRescuePlan = async () => {
    setIsGeneratingActions(true);
    const prompt = `Based on these metrics (Prime Cost: ${primeCostPct}%, COGS: ${cogsPct}%, Labor: ${laborPct}%), generate exactly 3 highly specific, operational action items to rescue profitability. Be direct and assign statuses of 'pending' or 'critical'.`;
    try {
      const aiActions = await callGemini(prompt, true);
      if (aiActions && aiActions.length > 0) {
        setActionItems(aiActions.map((a, i) => ({ ...a, id: Date.now() + i })));
      }
    } catch (error) {
      console.error("AI Generation Failed", error);
    } finally {
      setIsGeneratingActions(false);
    }
  };

  const optimizeRecipe = async () => {
    setIsOptimizingRecipe(true);
    const prompt = `I need to reduce the food cost of my "${mockRecipe.name}" which currently costs $${mockRecipe.currentCost} to plate, resulting in ${dynamicFoodCostPct}% food cost at a $${dynamicMenuPrice} price. Give me 3 creative, high-impact culinary suggestions to drop this cost without making the dish feel cheap. Short, punchy paragraph.`;
    try {
      const advice = await callGemini(prompt, false);
      setRecipeIdea(advice);
    } catch (error) {
      setRecipeIdea("The Captain's comms are down. The storm is too heavy. Please try again.");
    } finally {
      setIsOptimizingRecipe(false);
    }
  };

  const submitPlankTest = async (finalAnswers) => {
    setIsAnalyzingPlank(true);
    const answersText = finalAnswers.map((ans, i) => `Q: ${plankQuestions[i].question} A: ${ans}`).join(' | ');
    const prompt = `The restaurant operator took the 'PRR Plank Test'. Here are their answers: ${answersText}. 
    Analyze their operational health. Give them a "Plank Risk Score" out of 100% (100% means they are falling off the plank into bankruptcy). 
    Write a harsh but fair 3-paragraph diagnostic report telling them exactly where their ship is leaking and how Privateer Restaurant Rescue would fix it. Format cleanly. Speak as The Captain.`;
    
    try {
      const result = await callGemini(prompt, false);
      setPlankResult(result);
    } catch (error) {
      setPlankResult("Failed to calculate coordinates. The storm is too heavy. Try again.");
    } finally {
      setIsAnalyzingPlank(false);
    }
  };

  const handlePrimeInputChange = (e) => {
    const { name, value } = e.target;
    setPrimeData(prev => ({ ...prev, [name]: Number(value) || 0 }));
  };

  // UI Components
  const renderPaywall = (featureName, description) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900 border border-slate-800 rounded-lg animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
        <Lock className="text-amber-500 w-10 h-10" />
      </div>
      <h2 className="text-3xl font-light text-white mb-4">Unlock the Captain's Quarters</h2>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        {description} Upgrade to PRR Premium to access {featureName}, unlimited AI recipe optimization, and direct consultation booking.
      </p>
      
      <div className="bg-slate-950 border border-amber-500/30 p-6 rounded-lg w-full max-w-sm mb-8">
        <h3 className="text-amber-500 font-bold text-xl mb-2">PRR Premium</h3>
        <p className="text-white text-3xl font-light mb-4">$99<span className="text-lg text-slate-500">/mo</span></p>
        <ul className="text-left space-y-3 mb-6">
          <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> Unlimited AI Insights</li>
          <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> The PRR Plank Test</li>
          <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-emerald-500"/> Advanced Recipe Mapping</li>
        </ul>
        <button 
          onClick={() => setIsPremium(true)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded transition-colors"
        >
          Simulate Payment & Upgrade
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Anchor className="text-amber-500 w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-wider">PRIVATEER</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Rescue</p>
            </div>
          </div>
        </div>

        {/* User Tier Status */}
        <div className="px-6 pb-4 mb-2 border-b border-slate-800">
          {isPremium ? (
             <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-2 rounded-full border border-amber-500/20 w-max">
               <Crown size={14} />
               <span className="text-xs font-bold uppercase tracking-wider">Premium Access</span>
             </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase">Free Tier</span>
              <button onClick={() => setIsPremium(true)} className="text-xs text-amber-500 hover:text-amber-400 underline">Upgrade</button>
            </div>
          )}
        </div>
        
        <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <NavItem icon={<TrendingUp size={20} />} label="Command Center" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Calculator size={20} />} label="Prime Costs" isActive={activeTab === 'prime'} onClick={() => setActiveTab('prime')} />
          <NavItem icon={<ClipboardList size={20} />} label="Inventory Master" isActive={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <NavItem icon={<MenuSquare size={20} />} label="Recipe Mapping" isActive={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')} />
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pro Tools</p>
            <NavItem 
              icon={isPremium ? <Skull size={20} /> : <Lock size={18} />} 
              label="The Plank Test" 
              isActive={activeTab === 'plank'} 
              onClick={() => setActiveTab('plank')} 
              highlight={!isPremium}
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setActiveTab('consultation')}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded transition-colors border border-slate-700"
          >
            <LifeBuoy size={20} className={isPremium ? "text-amber-500" : "text-slate-400"} />
            <span>Consultation</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-950">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-light text-white">Command Center</h2>
                <p className="text-slate-400 mt-1">Live Operational Overview</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium border ${primeCostPct > 60 ? 'bg-rose-900/30 text-rose-400 border-rose-500/30' : 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30'}`}>
                Status: {primeCostPct > 60 ? 'Taking on Water' : 'Smooth Sailing'}
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KpiCard title="Food/Bev Cost %" value={cogsPct} target={28.0} unit="%" isInverseGood={true} />
              <KpiCard title="Total Labor %" value={laborPct} target={30.0} unit="%" isInverseGood={true} />
              <KpiCard title="Live Prime Cost" value={primeCostPct} target={58.0} unit="%" isInverseGood={true} highlight={true} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-medium text-white flex items-center gap-2">
                    <AlertCircle className="text-amber-500" size={20} />
                    Tactical Rescue Plan
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Click items to mark them as completed.</p>
                </div>
                <button 
                  onClick={generateRescuePlan} disabled={isGeneratingActions}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 py-2 px-4 rounded transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  {isGeneratingActions ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  <span>✨ AI Generate Strategy</span>
                </button>
              </div>
              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleTaskStatus(item.id)}
                    className={`flex items-start gap-3 p-4 rounded border transition-all cursor-pointer hover:bg-slate-800 ${item.status === 'done' ? 'bg-slate-900/50 border-slate-800/50 opacity-60' : 'bg-slate-950 border-slate-800 shadow-sm'}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.status === 'done' ? (
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      ) : item.status === 'critical' ? (
                        <div className="w-5 h-5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-amber-500" />
                      )}
                    </div>
                    <span className={`text-sm md:text-base ${item.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRIME COSTS TAB */}
        {activeTab === 'prime' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <header>
              <h2 className="text-3xl font-light text-white">Prime Cost Calculator</h2>
              <p className="text-slate-400 mt-1">Input your weekly numbers to see your operational health.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><DollarSign size={18} className="text-emerald-400"/> Gross Sales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Food Sales ($)" name="foodSales" value={primeData.foodSales} onChange={handlePrimeInputChange} />
                    <InputGroup label="Beverage Sales ($)" name="bevSales" value={primeData.bevSales} onChange={handlePrimeInputChange} />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><ClipboardList size={18} className="text-rose-400"/> Cost of Goods Sold (Purchases + Variance)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Food COGS ($)" name="foodCogs" value={primeData.foodCogs} onChange={handlePrimeInputChange} />
                    <InputGroup label="Beverage COGS ($)" name="bevCogs" value={primeData.bevCogs} onChange={handlePrimeInputChange} />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-amber-400"/> Labor Costs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGroup label="Hourly Wages ($)" name="hourlyLabor" value={primeData.hourlyLabor} onChange={handlePrimeInputChange} />
                    <InputGroup label="Salaries ($)" name="salariedLabor" value={primeData.salariedLabor} onChange={handlePrimeInputChange} />
                    <InputGroup label="Taxes/Benefits ($)" name="taxesBenefits" value={primeData.taxesBenefits} onChange={handlePrimeInputChange} />
                  </div>
                </div>
              </div>

              {/* Live Results Panel */}
              <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-6 shadow-xl flex flex-col h-full sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center border-b border-slate-800 pb-4">The Captain's Ledger</h3>
                
                <div className="space-y-6 flex-1">
                  <ResultRow label="Total Sales" value={`$${totalSales.toLocaleString()}`} />
                  <ResultRow label="Total COGS" value={`$${totalCogs.toLocaleString()}`} subtext={`${cogsPct}% of Sales`} />
                  <ResultRow label="Total Labor" value={`$${totalLabor.toLocaleString()}`} subtext={`${laborPct}% of Sales`} />
                  
                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <p className="text-center text-sm text-slate-400 mb-2">Weekly Prime Cost</p>
                    <div className={`text-center text-5xl font-light mb-2 ${primeCostPct > 60 ? 'text-rose-400' : primeCostPct < 55 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {primeCostPct}%
                    </div>
                    <p className="text-center text-sm text-slate-500">
                      Target: &lt; 60% <br/>
                      {primeCostPct > 60 ? "🚨 You are bleeding cash. Fix this immediately." : "✅ Excellent margin control."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECIPE MAPPING TAB */}
        {activeTab === 'recipes' && (
           <div className="space-y-8 animate-in fade-in duration-500">
            <header>
              <h2 className="text-3xl font-light text-white">Interactive Recipe Mapping</h2>
              <p className="text-slate-400 mt-1">Adjust menu pricing to instantly view margin impact.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recipe Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-2xl font-medium text-white">{mockRecipe.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${dynamicFoodCostPct > 30 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {dynamicFoodCostPct}% Food Cost
                      </span>
                      <span className="text-emerald-500 text-sm font-medium">
                        +${dynamicGrossProfit} Gross Profit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Slider */}
                <div className="mb-8 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-slate-400">Set Menu Price</label>
                    <span className="text-2xl font-bold text-white">${dynamicMenuPrice.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="60" 
                    step="0.50"
                    value={dynamicMenuPrice}
                    onChange={(e) => setDynamicMenuPrice(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>$20.00</span>
                    <span>$60.00</span>
                  </div>
                </div>

                <table className="w-full text-left border-collapse mb-2">
                  <thead>
                    <tr className="border-b border-slate-800 text-sm text-slate-400">
                      <th className="pb-2 font-medium">Ingredient</th>
                      <th className="pb-2 font-medium text-right">Ext. Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {mockRecipe.ingredients.map((ing, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 text-slate-300">{ing.name}</td>
                        <td className="py-3 text-right font-mono text-slate-300">${ing.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-700">
                      <td className="py-4 font-bold text-white text-lg">Total Plate Cost</td>
                      <td className="py-4 text-right font-bold text-amber-400 font-mono text-lg">${mockRecipe.currentCost.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* AI Optimizer Panel */}
              <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-6 relative overflow-hidden flex flex-col shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                  <ChefHat className={isPremium ? "text-amber-500" : "text-slate-500"} size={24} />
                  The Captain's Cost Cutter {isPremium ? '' : '(PRO)'}
                </h3>
                
                {isPremium ? (
                  <>
                    <p className="text-sm text-slate-400 mb-6">Use the Privateer AI to analyze this recipe and suggest substitutions to salvage margins.</p>
                    <button 
                      onClick={optimizeRecipe} disabled={isOptimizingRecipe}
                      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-amber-500/50 text-amber-400 font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 mb-6"
                    >
                      {isOptimizingRecipe ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                      <span>✨ Optimize Margins</span>
                    </button>
                    <div className="flex-1 bg-slate-950 border border-slate-800 rounded p-5 overflow-y-auto min-h-[200px] shadow-inner">
                      {isOptimizingRecipe ? (
                         <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                            <Loader2 className="animate-spin w-8 h-8 text-amber-500/50" />
                            <span className="text-sm animate-pulse">The Captain is analyzing supplier yields...</span>
                         </div>
                      ) : recipeIdea ? (
                        <div className="text-slate-300 text-base leading-relaxed whitespace-pre-wrap">{recipeIdea}</div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-600 text-sm text-center italic">
                          Awaiting orders, Captain.
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <Lock className="text-slate-600 w-12 h-12 mb-4" />
                    <p className="text-slate-400 text-sm mb-4">Recipe intelligence and substitution recommendations are reserved for Premium captains.</p>
                    <button onClick={() => setIsPremium(true)} className="text-amber-500 hover:text-amber-400 text-sm font-bold underline">Upgrade to Unlock</button>
                  </div>
                )}
              </div>
            </div>
           </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-light text-white">Inventory Master</h2>
                  <p className="text-slate-400 mt-1">Digitized perpetual inventory. Keep it tight.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search inventory..." 
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                        <th className="p-4">Item #</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Pack/Size</th>
                        <th className="p-4">Unit</th>
                        <th className="p-4 text-right">Price</th>
                        <th className="p-4 text-center">Yield</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {filteredInventory.length > 0 ? filteredInventory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono text-slate-500 text-sm">{item.id}</td>
                          <td className="p-4 text-white font-medium">{item.desc}</td>
                          <td className="p-4 text-slate-300 text-sm">{item.pack}</td>
                          <td className="p-4 text-slate-300 text-sm">{item.unit}</td>
                          <td className="p-4 font-mono text-right text-slate-300">${item.price.toFixed(2)}</td>
                          <td className="p-4 text-emerald-400 font-mono text-center text-sm">{(item.yield * 100).toFixed(0)}%</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                              ${item.stock === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                item.stock === 'Low' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'}`}
                            >
                              {item.stock}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-slate-500">
                            No items found in the hold matching "{inventorySearch}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        )}

        {/* THE PLANK TEST TAB */}
        {activeTab === 'plank' && (
          <div className="h-full animate-in fade-in duration-500">
            {!isPremium ? (
              renderPaywall("The PRR Plank Test", "Find out if your restaurant is sinking before it's too late. The Plank Test is a comprehensive AI audit of your operational health.")
            ) : (
              <div className="max-w-3xl mx-auto py-8">
                <div className="text-center mb-10">
                  <Skull className="text-amber-500 w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-4xl font-light text-white tracking-wide">The Plank Test</h2>
                  <p className="text-slate-400 mt-2">The Captain's unvarnished operational audit.</p>
                </div>

                {isAnalyzingPlank ? (
                  <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-12 text-center shadow-2xl">
                    <Map className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-pulse" />
                    <h3 className="text-2xl text-white font-medium mb-4">Charting Your Course...</h3>
                    <p className="text-slate-400">The Captain is reviewing your logs to determine your risk of capsizing.</p>
                    <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mt-8" />
                  </div>
                ) : plankResult ? (
                  <div className="bg-slate-900 border border-amber-500/50 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-500" />
                    <h3 className="text-2xl text-white font-bold mb-6 flex items-center gap-2">
                      <Anchor className="text-amber-500" /> The Captain's Assessment
                    </h3>
                    <div className="text-slate-300 space-y-4 leading-relaxed whitespace-pre-wrap text-lg">
                      {plankResult}
                    </div>
                    <button onClick={() => { setPlankStep(0); setPlankAnswers([]); setPlankResult(null); }} className="mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded font-medium transition-colors border border-slate-700">
                      Retake Test
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-8 text-sm font-medium text-slate-500 uppercase tracking-wider">
                      <span>Question {plankStep + 1} of {plankQuestions.length}</span>
                      <div className="flex gap-1">
                        {plankQuestions.map((_, i) => (
                          <div key={i} className={`w-8 h-1 rounded ${i <= plankStep ? 'bg-amber-500' : 'bg-slate-800'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl text-white font-medium mb-8 leading-snug">
                      {plankQuestions[plankStep].question}
                    </h3>
                    
                    <div className="space-y-4">
                      {plankQuestions[plankStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const newAnswers = [...plankAnswers, option];
                            setPlankAnswers(newAnswers);
                            if (plankStep < plankQuestions.length - 1) setPlankStep(plankStep + 1);
                            else submitPlankTest(newAnswers);
                          }}
                          className="w-full text-left p-4 rounded-lg border border-slate-700 bg-slate-950 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200 transition-all duration-200 group flex items-center justify-between"
                        >
                          <span className="text-lg">{option}</span>
                          <ChevronRight className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* CONSULTATION TAB */}
        {activeTab === 'consultation' && (
          <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <LifeBuoy className="text-amber-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-light text-white">Request a Rescue</h2>
              <p className="text-slate-400 mt-2">Submit your distress signal. Privateer Restaurant Rescue will review your operation.</p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-8 text-center shadow-lg">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl text-white font-medium mb-2">Signal Received</h3>
                <p className="text-emerald-200">The Captain will review your logs and hail you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); setTimeout(() => { setActiveTab('dashboard'); setFormSubmitted(false); }, 4000); }} className="bg-slate-900 border border-slate-800 rounded-lg p-6 md:p-8 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Your Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Restaurant Name</label>
                    <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none transition-all" placeholder="The Sinking Ship Grill" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Primary Contact Email</label>
                  <input required type="email" className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none transition-all" placeholder="operator@restaurant.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Biggest Pain Point</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none transition-all appearance-none">
                    <option>Food Cost is out of control ({'>'}35%)</option>
                    <option>Labor Cost is killing margins</option>
                    <option>High staff turnover / Training issues</option>
                    <option>Other / General Hemorrhaging</option>
                  </select>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-6 rounded text-lg transition-colors mt-4 shadow-lg shadow-amber-500/20">
                  <Send size={20} /><span>Send Distress Signal</span>
                </button>
              </form>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, isActive, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive 
          ? 'bg-slate-800 text-amber-500 shadow-sm' 
          : highlight ? 'text-slate-400 hover:bg-slate-800/50 hover:text-amber-400 border border-dashed border-slate-700/50' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {isActive && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );
}

function KpiCard({ title, value, target, unit, isInverseGood, highlight }) {
  const diff = value - target;
  const isBad = isInverseGood ? diff > 0 : diff < 0;
  return (
    <div className={`p-6 rounded-lg border transition-all ${highlight ? 'bg-slate-800 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
      <h4 className="text-slate-400 text-sm font-medium mb-2">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-light text-white">{value}{unit}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="text-slate-500">Target: {target}{unit}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${isBad ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
          {isBad ? '+' : ''}{diff.toFixed(1)}{unit} Variance
        </span>
      </div>
    </div>
  );
}

function InputGroup({ label, name, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</label>
      <input 
        type="number" 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full bg-slate-950 border border-slate-800 text-white rounded p-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
      />
    </div>
  );
}

function ResultRow({ label, value, subtext }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-slate-300 font-medium">{label}</p>
        {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
      </div>
      <p className="text-white text-xl font-mono">{value}</p>
    </div>
  );
}
