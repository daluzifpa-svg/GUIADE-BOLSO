/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Thermometer, Snowflake, Refrigerator, Info, ChevronRight, Calculator, BookOpen, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SENSOR_DATABASE, TEMPERATURE_TABLE, SensorData } from './data/sensors';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'AC' | 'REF'>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<SensorData | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'table' | 'collab'>('guide');
  
  // Form state
  const [formData, setFormData] = useState({
    brand: '',
    type: 'AC',
    category: 'INVERTER',
    sensor_location: '',
    resistance: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contributionCount, setContributionCount] = useState(0);

  useEffect(() => {
    fetch('/api/contributions/count')
      .then(res => res.json())
      .then(data => setContributionCount(data.count))
      .catch(() => {});
  }, [submitSuccess]);

  const filteredBrands = useMemo(() => {
    return SENSOR_DATABASE.filter(brand => {
      const matchesSearch = brand.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'ALL' || brand.type === 'BOTH' || brand.type === filterType;
      return matchesSearch && matchesFilter;
    }).sort((a, b) => a.brand.localeCompare(b.brand));
  }, [searchTerm, filterType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({
          brand: '',
          type: 'AC',
          category: 'INVERTER',
          sensor_location: '',
          resistance: '',
          notes: ''
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-[#141414]/10 p-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Thermometer className="text-emerald-600" size={28} />
              Guia NTC
            </h1>
            <p className="text-xs text-[#141414]/60 uppercase tracking-widest font-semibold mt-1">
              Referência de Bolso
            </p>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setActiveTab('guide')}
              className={`p-2 rounded-full transition-colors ${activeTab === 'guide' ? 'bg-emerald-100 text-emerald-700' : 'text-[#141414]/40 hover:bg-black/5'}`}
            >
              <BookOpen size={20} />
            </button>
            <button 
              onClick={() => setActiveTab('table')}
              className={`p-2 rounded-full transition-colors ${activeTab === 'table' ? 'bg-emerald-100 text-emerald-700' : 'text-[#141414]/40 hover:bg-black/5'}`}
            >
              <Calculator size={20} />
            </button>
            <button 
              onClick={() => setActiveTab('collab')}
              className={`p-2 rounded-full transition-colors ${activeTab === 'collab' ? 'bg-emerald-100 text-emerald-700' : 'text-[#141414]/40 hover:bg-black/5'}`}
            >
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {activeTab === 'guide' ? (
          <>
            {/* Search & Filter */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141414]/30" size={18} />
                <input
                  type="text"
                  placeholder="Buscar marca..."
                  className="w-full bg-white border border-[#141414]/10 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'ALL', label: 'Todos', icon: null },
                  { id: 'AC', label: 'Ar Cond.', icon: Snowflake },
                  { id: 'REF', label: 'Geladeiras', icon: Refrigerator }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFilterType(type.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                      filterType === type.id 
                        ? 'bg-[#141414] text-white border-[#141414]' 
                        : 'bg-white text-[#141414]/60 border-[#141414]/10 hover:border-[#141414]/30'
                    }`}
                  >
                    {type.icon && <type.icon size={14} />}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand List */}
            <div className="space-y-3">
              {filteredBrands.map((brand) => (
                <motion.div
                  layout
                  key={brand.brand}
                  onClick={() => setSelectedBrand(selectedBrand?.brand === brand.brand ? null : brand)}
                  className="bg-white border border-[#141414]/5 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        brand.type === 'AC' ? 'bg-blue-50 text-blue-600' : 
                        brand.type === 'REF' ? 'bg-orange-50 text-orange-600' : 
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {brand.type === 'AC' ? <Snowflake size={20} /> : 
                         brand.type === 'REF' ? <Refrigerator size={20} /> : 
                         <Thermometer size={20} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{brand.brand}</h3>
                        <p className="text-xs text-[#141414]/40 uppercase font-semibold">
                          {brand.type === 'BOTH' ? 'AC & Refrigeração' : 
                           brand.type === 'AC' ? 'Ar Condicionado' : 'Refrigeração'}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedBrand?.brand === brand.brand ? 90 : 0 }}
                    >
                      <ChevronRight className="text-[#141414]/20" size={20} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {selectedBrand?.brand === brand.brand && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[#141414]/5 bg-gray-50/50"
                      >
                        <div className="p-4 space-y-6">
                          {/* Convencional Section */}
                          {brand.values.some(v => v.category === 'CONVENCIONAL') && (
                            <div>
                              <h4 className="text-[10px] font-black text-[#141414]/30 uppercase tracking-widest mb-2 px-1">Convencional (On/Off)</h4>
                              <div className="space-y-2">
                                {brand.values.filter(v => v.category === 'CONVENCIONAL').map((v, idx) => (
                                  <div key={idx} className="flex justify-between items-start gap-4 p-3 bg-white rounded-xl border border-[#141414]/5 shadow-sm">
                                    <div>
                                      <p className="text-sm font-medium text-[#141414]/80">{v.label}</p>
                                      {v.notes && <p className="text-[10px] text-emerald-600 font-semibold uppercase mt-0.5">{v.notes}</p>}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-lg font-black text-emerald-700">{v.resistance}</span>
                                      <p className="text-[10px] text-[#141414]/40 font-bold">@ 25°C</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Inverter Section */}
                          {brand.values.some(v => v.category === 'INVERTER') && (
                            <div>
                              <h4 className="text-[10px] font-black text-blue-600/40 uppercase tracking-widest mb-2 px-1">Tecnologia Inverter</h4>
                              <div className="space-y-2">
                                {brand.values.filter(v => v.category === 'INVERTER').map((v, idx) => (
                                  <div key={idx} className="flex justify-between items-start gap-4 p-3 bg-white rounded-xl border border-blue-500/10 shadow-sm">
                                    <div>
                                      <p className="text-sm font-medium text-[#141414]/80">{v.label}</p>
                                      {v.notes && <p className="text-[10px] text-blue-600 font-semibold uppercase mt-0.5">{v.notes}</p>}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-lg font-black text-blue-700">{v.resistance}</span>
                                      <p className="text-[10px] text-[#141414]/40 font-bold">@ 25°C</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* General/Refrigeração Section */}
                          {brand.values.some(v => v.category === 'GENERAL') && (
                            <div>
                              <h4 className="text-[10px] font-black text-orange-600/40 uppercase tracking-widest mb-2 px-1">Refrigeração / Geral</h4>
                              <div className="space-y-2">
                                {brand.values.filter(v => v.category === 'GENERAL').map((v, idx) => (
                                  <div key={idx} className="flex justify-between items-start gap-4 p-3 bg-white rounded-xl border border-orange-500/10 shadow-sm">
                                    <div>
                                      <p className="text-sm font-medium text-[#141414]/80">{v.label}</p>
                                      {v.notes && <p className="text-[10px] text-orange-600 font-semibold uppercase mt-0.5">{v.notes}</p>}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-lg font-black text-orange-700">{v.resistance}</span>
                                      <p className="text-[10px] text-[#141414]/40 font-bold">@ 25°C</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {filteredBrands.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#141414]/40 font-medium">Nenhuma marca encontrada.</p>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'table' ? (
          /* Temperature Table */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#141414]/10 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="p-6 bg-[#141414] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calculator size={22} className="text-emerald-400" />
                Tabela de Conversão
              </h2>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">Valores aproximados em kΩ</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#141414]/5">
                    <th className="p-4 text-[10px] font-black uppercase text-[#141414]/40">Temp °C</th>
                    <th className="p-4 text-[10px] font-black uppercase text-emerald-600">5k</th>
                    <th className="p-4 text-[10px] font-black uppercase text-emerald-600">10k</th>
                    <th className="p-4 text-[10px] font-black uppercase text-emerald-600">15k</th>
                    <th className="p-4 text-[10px] font-black uppercase text-emerald-600">20k</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPERATURE_TABLE.map((row) => (
                    <tr key={row.temp} className="border-b border-[#141414]/5 hover:bg-emerald-50/30 transition-colors">
                      <td className="p-4 font-bold text-lg">{row.temp}°</td>
                      <td className="p-4 font-mono text-sm">{row.r5k.toFixed(1)}</td>
                      <td className="p-4 font-mono text-sm">{row.r10k.toFixed(1)}</td>
                      <td className="p-4 font-mono text-sm">{row.r15k.toFixed(1)}</td>
                      <td className="p-4 font-mono text-sm">{row.r20k.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-emerald-50 flex items-start gap-3">
              <Info size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                <strong>Nota:</strong> Sensores NTC diminuem a resistência conforme a temperatura aumenta. Os valores acima são referências padrão para testes rápidos.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Colaborar / Feedback Tab */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black leading-tight">Ajude a alimentar o guia!</h2>
                <p className="text-emerald-100 text-sm mt-2">Encontrou um NTC diferente? Compartilhe com a comunidade de técnicos.</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  {contributionCount} Contribuições recebidas
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Send size={120} />
              </div>
            </div>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-4 shadow-xl"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold">Obrigado, Colega!</h3>
                <p className="text-sm text-[#141414]/60">Sua contribuição foi enviada com sucesso e será analisada para a próxima atualização do guia.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="w-full bg-[#141414] text-white py-3 rounded-2xl font-bold text-sm"
                >
                  Enviar outro
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#141414]/10 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#141414]/40 px-1">Marca do Equipamento</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Agratto, Philco..."
                    className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-[#141414]/40 px-1">Tipo</label>
                    <select 
                      className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="AC">Ar Condicionado</option>
                      <option value="REF">Geladeira</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-[#141414]/40 px-1">Tecnologia</label>
                    <select 
                      className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="INVERTER">Inverter</option>
                      <option value="CONVENCIONAL">Convencional</option>
                      <option value="GENERAL">Geral</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#141414]/40 px-1">Local do Sensor / Resistência</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      type="text"
                      placeholder="Ex: Descarga"
                      className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      value={formData.sensor_location}
                      onChange={e => setFormData({...formData, sensor_location: e.target.value})}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Ex: 50k"
                      className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      value={formData.resistance}
                      onChange={e => setFormData({...formData, resistance: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#141414]/40 px-1">Observações Adicionais</label>
                  <textarea
                    placeholder="Algum detalhe importante?"
                    className="w-full bg-gray-50 border border-[#141414]/5 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[80px]"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      <Send size={18} />
                      Enviar Contribuição
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )
}
      </main>

      {/* Footer / Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#141414]/10 p-4 z-10">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'guide' ? 'text-emerald-600' : 'text-[#141414]/40'}`}
          >
            <BookOpen size={24} />
            <span className="text-[10px] font-bold uppercase">Marcas</span>
          </button>
          <button 
            onClick={() => setActiveTab('table')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'table' ? 'text-emerald-600' : 'text-[#141414]/40'}`}
          >
            <Calculator size={24} />
            <span className="text-[10px] font-bold uppercase">Tabela</span>
          </button>
          <button 
            onClick={() => setActiveTab('collab')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'collab' ? 'text-emerald-600' : 'text-[#141414]/40'}`}
          >
            <MessageSquare size={24} />
            <span className="text-[10px] font-bold uppercase">Colaborar</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
