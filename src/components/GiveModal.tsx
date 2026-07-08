import React, { useState } from "react";
import { X, Landmark, Smartphone, CreditCard, Send, CheckCircle } from "lucide-react";

interface GiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiveModal({ isOpen, onClose }: GiveModalProps) {
  const [activeTab, setActiveTab] = useState<"mpesa" | "bank" | "card">("mpesa");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleReset = () => {
    setAmount("");
    setDonorName("");
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md p-4 flex justify-center items-center">
      <div className="relative w-full max-w-lg bg-[#110526] border border-brand-gold/25 rounded-2xl overflow-hidden shadow-2xl text-left my-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 border-b border-brand-gold/15 bg-brand-purple-dark/80">
          <div>
            <span className="text-[0.62rem] tracking-[2px] uppercase text-brand-gold font-bold">
              Secure Online Giving
            </span>
            <h3 className="font-serif text-base md:text-lg font-bold text-white mt-0.5">
              Support KSF Ministries
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-brand-gold transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-5 md:p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-brand-gold-light animate-bounce mb-4" />
            <h4 className="font-serif text-xl md:text-2xl font-bold text-white mb-2">
              Thank You for Your Seed!
            </h4>
            <p className="text-brand-grey text-xs md:text-sm leading-relaxed max-w-sm mb-6">
              "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Corinthians 9:7
            </p>
            {donorName && (
              <span className="text-brand-gold font-mono text-xs md:text-sm block mb-8 bg-brand-gold/5 border border-brand-gold/20 px-4 py-2 rounded">
                Recipient: {donorName} • Amount: KES {Number(amount).toLocaleString()}
              </span>
            )}
            <button
              onClick={handleReset}
              className="bg-brand-gold text-[#0a0010] px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-brand-gold-light"
            >
              Partner Again
            </button>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-6">
              <button
                onClick={() => setActiveTab("mpesa")}
                className={`py-2.5 px-1.5 md:py-3 md:px-2 rounded-xl border flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all font-medium text-[10px] sm:text-xs md:text-sm ${
                  activeTab === "mpesa"
                    ? "bg-brand-gold border-brand-gold text-[#0a0010]"
                    : "bg-[#180836] border-brand-gold/15 text-white/70 hover:border-brand-gold/30"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="truncate max-w-full">M-Pesa</span>
              </button>
              <button
                onClick={() => setActiveTab("bank")}
                className={`py-2.5 px-1.5 md:py-3 md:px-2 rounded-xl border flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all font-medium text-[10px] sm:text-xs md:text-sm ${
                  activeTab === "bank"
                    ? "bg-brand-gold border-brand-gold text-[#0a0010]"
                    : "bg-[#180836] border-brand-gold/15 text-white/70 hover:border-brand-gold/30"
                }`}
              >
                <Landmark className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="truncate max-w-full">Bank Wire</span>
              </button>
              <button
                onClick={() => setActiveTab("card")}
                className={`py-2.5 px-1.5 md:py-3 md:px-2 rounded-xl border flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all font-medium text-[10px] sm:text-xs md:text-sm ${
                  activeTab === "card"
                    ? "bg-brand-gold border-brand-gold text-[#0a0010]"
                    : "bg-[#180836] border-brand-gold/15 text-white/70 hover:border-brand-gold/30"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="truncate max-w-full">Credit Card</span>
              </button>
            </div>

            {/* Tab content */}
            {activeTab === "mpesa" && (
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 bg-[#180836] p-3.5 md:p-4 rounded-xl border border-brand-gold/10 text-xs md:text-sm">
                <span className="text-[0.62rem] tracking-wider uppercase text-brand-gold font-bold block">
                  How to give via M-Pesa
                </span>
                <div className="space-y-1.5 md:space-y-2 text-white/80 font-light leading-relaxed">
                  <p>1. Open M-Pesa on your phone.</p>
                  <p>2. Select <strong>Lipa Na M-Pesa</strong>, then choose <strong>Paybill</strong>.</p>
                  <p>3. Enter Business No: <strong className="text-brand-gold font-mono">880200</strong> (KSF Nakuru).</p>
                  <p>4. Enter Account No: Choose (e.g., <strong className="text-brand-gold font-mono">Tithe</strong>, <strong className="text-brand-gold font-mono">Offering</strong>, or <strong className="text-brand-gold font-mono">Missions</strong>).</p>
                  <p>5. Enter the amount & input your M-Pesa PIN.</p>
                </div>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 bg-[#180836] p-3.5 md:p-4 rounded-xl border border-brand-gold/10 text-xs md:text-sm">
                <span className="text-[0.62rem] tracking-wider uppercase text-brand-gold font-bold block">
                  Direct Bank Wire Transfers
                </span>
                <div className="space-y-2.5 md:space-y-3 text-white/80 font-light leading-relaxed">
                  <div>
                    <span className="text-brand-gold text-xs block font-bold">Bank Name:</span>
                    <strong>Co-operative Bank of Kenya</strong>
                  </div>
                  <div>
                    <span className="text-brand-gold text-xs block font-bold">Branch Name:</span>
                    <strong>Nakuru Branch</strong>
                  </div>
                  <div>
                    <span className="text-brand-gold text-xs block font-bold">Account Name:</span>
                    <strong>Kingdom Seekers Fellowship Nakuru</strong>
                  </div>
                  <div>
                    <span className="text-brand-gold text-xs block font-bold">Account Number:</span>
                    <strong className="font-mono text-brand-gold-light">01128090442200</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "card" && (
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider block mb-1 font-semibold">
                    Contributor Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-[#180836] border border-brand-gold/20 focus:border-brand-gold rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider block mb-1 font-semibold">
                      Amount (KES)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#180836] border border-brand-gold/20 focus:border-brand-gold rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider block mb-1 font-semibold">
                      Purpose
                    </label>
                    <select className="w-full bg-[#180836] border border-brand-gold/20 focus:border-brand-gold rounded-lg px-4 py-2.5 text-white text-sm outline-none">
                      <option>Tithe</option>
                      <option>Sunday Offering</option>
                      <option>Prayer Mountain Partner</option>
                      <option>MBCI Media Partner</option>
                      <option>Missions Seeds</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-brand-gold/5 border border-brand-gold/20 rounded-lg">
                  <span className="text-white/50 text-[0.68rem] block">
                    Secured by standard bank-grade SSL gateways. Card details are strictly transmitted under end-to-end encrypted tunnels.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-brand-gold hover:bg-brand-gold-light disabled:bg-brand-gold/30 disabled:text-white/50 text-[#0a0010] py-3.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0a0010] border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting Contribution...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Process Secure Seed</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer verse */}
            <div className="text-center text-white/40 text-xs italic border-t border-brand-gold/10 pt-4">
              "Honour the Lord with thy substance, and with the firstfruits of all thine increase." — Proverbs 3:9
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
