import { useState } from 'react';

export default function StampDutyCalculator() {
  const [price, setPrice] = useState(700000);
  const [firstHome, setFirstHome] = useState(true);
  
  // Queensland stamp duty calculation
  const calculateStampDuty = (price: number, firstHome: boolean) => {
    if (firstHome && price <= 550000) return 0;
    
    let duty = 0;
    if (price <= 350000) {
      duty = price * 0.01;
    } else if (price <= 540000) {
      duty = 3500 + (price - 350000) * 0.035;
    } else if (price <= 1000000) {
      duty = 10150 + (price - 540000) * 0.045;
    } else {
      duty = 30850 + (price - 1000000) * 0.0575;
    }
    
    // First home concession
    if (firstHome && price <= 650000) {
      const concession = Math.max(0, 15925 - (price - 550000) * 0.15925);
      duty = Math.max(0, duty - concession);
    }
    
    return duty;
  };
  
  const duty = calculateStampDuty(price, firstHome);
  
  return (
    <div className="bg-neutral p-6 rounded-lg shadow max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Stamp Duty Calculator (QLD)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-bold">Purchase price</label>
          <input 
            type="number" 
            value={price} 
            onChange={e => setPrice(+e.target.value)}
            className="w-full border border-border rounded p-2"
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={firstHome}
              onChange={e => setFirstHome(e.target.checked)}
              className="rounded"
            />
            <span className="font-bold">First home buyer</span>
          </label>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-bold">Stamp Duty:</span>
            <span className="text-2xl font-bold text-accent2">
              ${duty.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
          {firstHome && price <= 550000 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Eligible for full first home concession
            </p>
          )}
        </div>
      </div>
    </div>
  );
}