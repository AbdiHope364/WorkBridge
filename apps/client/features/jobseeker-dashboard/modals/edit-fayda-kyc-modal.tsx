import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@repo/ui";
import {
  ShieldCheck,
  CreditCard,
  BadgeCheck,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";

interface EditFaydaKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    faydaFin?: string;
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    frontDocName?: string;
    backDocName?: string;
    faydaStatus?: string;
  };
  onSave?: (data: {
    faydaFin: string;
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    frontDocName?: string;
    backDocName?: string;
  }) => Promise<void> | void;
}

export function EditFaydaKycModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditFaydaKycModalProps) {
  const [faydaFin, setFaydaFin] = useState(initialData?.faydaFin || "");
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth || "");
  const [gender, setGender] = useState(initialData?.gender || "male");
  const [frontDocName, setFrontDocName] = useState(
    initialData?.frontDocName || "fayda_id_card_front.jpg"
  );
  const [backDocName, setBackDocName] = useState(
    initialData?.backDocName || "fayda_id_card_back.jpg"
  );
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFaydaFin(initialData?.faydaFin || "");
      setFullName(initialData?.fullName || "");
      setDateOfBirth(initialData?.dateOfBirth || "");
      setGender(initialData?.gender || "male");
      setFrontDocName(initialData?.frontDocName || "fayda_id_card_front.jpg");
      setBackDocName(initialData?.backDocName || "fayda_id_card_back.jpg");
      setErrorMsg(null);
    }
  }, [isOpen, initialData]);

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFrontDocName(file.name);
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackDocName(file.name);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faydaFin.trim()) {
      setErrorMsg("Please enter your 16-digit Fayda Identification Number (FIN).");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSave?.({
        faydaFin: faydaFin.trim(),
        fullName: fullName.trim() || undefined,
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || undefined,
        frontDocName: frontDocName || undefined,
        backDocName: backDocName || undefined,
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit Fayda verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Fayda National ID (KYC) Verification"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 max-w-full overflow-hidden">
        {/* Verification Intro Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0b241b] via-[#103b2c] to-[#0b241b] p-4 sm:p-5 text-white shadow-sm border border-emerald-800 flex items-start gap-3.5 sm:gap-4">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 flex-wrap">
              National Digital ID Authentication (Fayda / ፋይዳ)
            </h4>
            <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-1 leading-relaxed break-words">
              Verify your Ethiopian Fayda National ID to earn verified worker status, increase client trust, and unlock direct trade booking.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl break-words">
            {errorMsg}
          </div>
        )}

        {/* Digital ID Preview Card */}
        <div className="rounded-2xl border-2 border-emerald-600/30 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">🇪🇹</span>
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-emerald-300 uppercase truncate">
                FDRE National ID • Fayda (ፋይዳ)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300 shrink-0">
              <BadgeCheck className="h-3 w-3" /> OFFICIAL
            </span>
          </div>

          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Full Name</p>
              <p className="font-bold text-slate-100 text-xs sm:text-sm truncate">{fullName || "Not Specified"}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Fayda Identification (FIN)</p>
              <p className="font-mono font-bold text-emerald-400 text-xs sm:text-sm truncate">{faydaFin || "FIN-XXXX-XXXX-XXXX"}</p>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Fayda Identification Number (FIN) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={faydaFin}
                onChange={(e) => setFaydaFin(e.target.value)}
                placeholder="FIN-9042-8821-3419 or 16-digit ID"
                required
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 pl-10 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Found on your printed Fayda ID card or Fayda e-ID resident app.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name as on Fayda ID
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Abdi Abiot"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Upload Verification Attachments with Photo Previews */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Upload Fayda ID Photos (Front & Back) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Front ID Upload Card */}
              <div className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/70 p-4 text-center transition flex flex-col justify-between items-center min-h-[160px]">
                <input
                  type="file"
                  ref={frontInputRef}
                  onChange={handleFrontFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                
                {frontPreview ? (
                  <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-200 shadow-xs group">
                    <img src={frontPreview} alt="Fayda Front ID" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setFrontPreview(null); setFrontDocName("fayda_id_front.jpg"); }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-white hover:bg-red-600 transition"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Fayda ID (Front Photo)</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">{frontDocName}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => frontInputRef.current?.click()}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold transition cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  {frontPreview ? "Change Front Photo" : "Upload Front Photo"}
                </button>
              </div>

              {/* Back ID Upload Card */}
              <div className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/70 p-4 text-center transition flex flex-col justify-between items-center min-h-[160px]">
                <input
                  type="file"
                  ref={backInputRef}
                  onChange={handleBackFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />

                {backPreview ? (
                  <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-200 shadow-xs group">
                    <img src={backPreview} alt="Fayda Back ID" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setBackPreview(null); setBackDocName("fayda_id_back.jpg"); }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-white hover:bg-red-600 transition"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Fayda ID (Back Photo)</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">{backDocName}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => backInputRef.current?.click()}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold transition cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  {backPreview ? "Change Back Photo" : "Upload Back Photo"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition text-center cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting KYC...</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Submit Fayda Verification</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

