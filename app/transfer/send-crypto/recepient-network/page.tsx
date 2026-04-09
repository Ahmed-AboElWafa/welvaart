'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Method = 'globalfin' | 'external' | null

const NETWORKS = [
  { id: 'erc20', label: 'ERC-20', sub: 'Ethereum Mainnet', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwQx-UFT9Q6gDYYN5Ae8W0ZZljCEz96fA4ZFs8MjkSi_Tv9SI5IRIbfRl0gGppKaET0zNPcbx8cmgi1nw8w2ZYrULn3cq8TK3Ij_4RZRk5f6j6b-6ISW17pKkq9kKCT-oiNG8TESs1Pa596LfJwgfAzyotmp1wg35DTB47t9t5Huw0J8Sf8fv3a9VopimWl48gROrFiMsu2z-ZvCtfSntDkAFo-rsYUUgVaqnHPBNlBJ6GJTP3WVzkMG4hG587LdfDBAb8_5xSPkTQ' },
  { id: 'bep20', label: 'BEP-20', sub: 'BNB Smart Chain', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy75IBYVbao4M9za_RiCB0LLOiV5UMW3_qBTaJMyzYHW_OIZXfBLIOc03B_YDKln9welaweBTIGdyG76aSwJkezo5yW88BvggLE8ojgp3Hy2IkPJkCBoNVbv5ezql3nxq2I8MTDgQ5Z3y84Gs-gIZrIExrKAooTdMSBfA5tW8iaYlJewrHH_0AJj98JorGdycuBUBUbw_sk_HmRxWENyPbKLNwZZHvhe5O3Q8YOmFZNJ2Rk84TGu_ZvQNx_0smb3IsRqNy06P1s3BU' },
  { id: 'sol', label: 'Solana', sub: 'SPL Token Network', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC18sK91q43S-CFDbqGRP0-vg8WIBQQCbTndS_NB0AN-Yv5M--UswFmMvdd0B4XKkVmL2vZH_SaUUVIxpwbRxwigUmTbJFdBlw-Uc4Y956rQsWsE-GGchfJOAiU0Z7_ft7xIsY-_elXlQR5TLCg8TeWCloLkr4XfCk1lrH8bypcTZjr4OD9Q8v_SLNT6Hu4wFmk6tEm8H2_DppaiRUozyh1THDNA-LfQGdYVhX-QQ1ZF8qPw7uJ8b48IjYdw-0O1buQal4f9WNDrckd' },
  { id: 'trc20', label: 'TRC-20', sub: 'TRON Network', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCabcIytw2rOTltnNRQXO3SE1-0rY58zl1V2xBpA2Czvm4FDjPRCF0c9-wJHZ7j-_mp5shTlunKUDgKApPJfph-qwxUtJ0gl2bQgsio1B5pC1Wk4olCGrCv7uutD00wDmSM0Ktl7sTEsQynej7iMpz30R1Z8slu-bR0-3Nctw0RtL25Fs_xQKO9yct6ee4bmHWx__GA75DZLaP-ZICYEd64odZGVyrZo4utYRBiMcRUf87rc_tLwqBjYKdErMEYlPBRwuTUY1TWK6_C' },
  { id: 'btc', label: 'Bitcoin', sub: 'BTC Native Network', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfS0b3cwfUMjmvblMYHvF8RlJBH5hVSv6JFfZlwB8gmB-XmGk_51UWygs2ZdXwu-fTO394ISQoQUYSI-wbehOTTXFk19BsCaiQEwpLU07V1yEdb8-abIhAwAb3fTE5Bwh2hhjABZhwcVScWfNe0X1gsSPHWuAwCsPtUyXOqvBGNtYvj-a2wNBSJNq2o6UTEPEF_dyQhbcYmuUqybo4IXQQI5AOc87ZyNt0GPbi46yKgRLK0_Gg5RfNQZb5ZmXjdEg0PtwWLr78pB3_' },
]

const RECENT = [
  { name: 'Alex Rivera', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSf_dv3r-LnnS7cnvbdPDc2WfuNFYb0kcd4fupeSVB58O3kMGadlMgBflO-6UzPtICvFP3FyQjB1gS1nJbRUJuyz5Pn27BwTXw6x0ffxqPcPHXsn6iwRT4qSgYo3L6MLV_F9EfOCjt2fOrPs7c48s4qlzbpT6vzfpcSOh0uIkcR1BvFaQOctm-cnNn4vAaW9xV0p3z98v-EHnYkENYcCG5piDAlHQ1O29vlSY5nHqa9cUd8D-ekMzfiXvyj6HA28iSOH5WlU2j_cbG' },
  { name: 'Sarah J.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkDQt82wqlcWfP6HnA53mhpKCR1ibxKuqkuP52-JjaF2WCw5XGGHigYC1A501Si8bJJivvg7oeD1i67gLd_vB_S7yczpfxvJ67k9g9tXCxJf-tr-1d-wPu7GFMNlye7VBYUD-3PJB18QdTFBuxs-mmgLzSpk6pEFqbP_rK2iDAXYT7z2Me3da_EcBM2KreDtom5UA7Qt3S9xXRIVFM5XwqD0oHbPN_jEL4VVThAcXbz2G4_wgdWW_CYshpKTgshktMB5HtQKwY59Qo' },
  { name: 'Marcus V.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcJvSjqqlDsjZWZdsJa5WJ4fa76Lb7Lh_HXxp7U2dwGnQjeIhpmhhOs6WTCFrdxLabUPMwycjIWvvQCRsq3gjMdcgS54RPWs9Kk6AfcmBK8QV5qNnI0sFlTbraJG_FChddapQT2utNHwArIwJUPhv53giLajD4PtCvFQU1mOGZX9zeqn9IFBPI9Lnthxa78UKtWHY0bmEIvxR2PveLhZN_5ekw4IFUBlNeG301pBQQluijC741T2s225zsRoHJuYs67XdlZ9a1GxWc' },
]

export default function SendCryptoRecipientNetworkPage() {
  const router = useRouter()

  const [activeMethod, setActiveMethod] = useState<Method>(null)

  // GlobalFin form
  const [gfIdentifier, setGfIdentifier] = useState('')
  const canProceedGlobalFin = gfIdentifier.trim().length > 0

  // External wallet form
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState<typeof NETWORKS[0] | null>(null)
  const [showNetworkPicker, setShowNetworkPicker] = useState(false)
  const canProceedExternal = walletAddress.trim().length > 10 && selectedNetwork !== null

  const handleMethodSelect = (method: Method) => {
    setActiveMethod(prev => prev === method ? null : method)
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[430px] mx-auto flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="h-4 w-full"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Crypto</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Progress Stepper */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 1 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recipient &amp; Network</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/3 rounded-full" />
        </div>
      </div>

      <main className="flex-1 px-4 py-2 space-y-8 overflow-y-auto pb-10">

        {/* ── Transfer Methods ── */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Transfer Methods</h3>
          <div className="grid grid-cols-1 gap-3">

            {/* — To GlobalFin User — */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
              <button
                onClick={() => handleMethodSelect('globalfin')}
                className={`flex items-center p-5 w-full text-left group transition-colors ${activeMethod === 'globalfin' ? 'bg-primary/5' : 'bg-[#F8FAFC] hover:bg-slate-50'}`}
              >
                <div className={`size-12 rounded-lg flex items-center justify-center mr-4 transition-all group-hover:scale-105 ${activeMethod === 'globalfin' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-white text-base">To GlobalFin User</p>
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase">Instant</span>
                  </div>
                  <p className="text-xs text-slate-500">Send via phone or username</p>
                </div>
                <span className={`material-symbols-outlined ml-3 text-slate-400 transition-transform duration-200 ${activeMethod === 'globalfin' ? 'rotate-90 text-primary' : ''}`}>chevron_right</span>
              </button>

              {activeMethod === 'globalfin' && (
                <div className="px-5 pb-5 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-3 font-medium">Enter the recipient&apos;s phone number or GlobalFin username</p>
                  <div className="relative mb-4">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person_search</span>
                    <input
                      value={gfIdentifier}
                      onChange={e => setGfIdentifier(e.target.value)}
                      placeholder="+1 555 000 0000 or @username"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400"
                      type="text"
                    />
                  </div>
                  <button
                    onClick={() => router.push(`/transfer/send-crypto/crypto-amount?name=GlobalFin%20User&handle=${encodeURIComponent(gfIdentifier)}&avatar=`)}
                    disabled={!canProceedGlobalFin}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>

            {/* — To External Wallet — */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
              <button
                onClick={() => handleMethodSelect('external')}
                className={`flex items-center p-5 w-full text-left group transition-colors ${activeMethod === 'external' ? 'bg-primary/5' : 'bg-[#F8FAFC] hover:bg-slate-50'}`}
              >
                <div className={`size-12 rounded-lg flex items-center justify-center mr-4 transition-all group-hover:scale-105 ${activeMethod === 'external' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-base">To External Wallet</p>
                  <p className="text-xs text-slate-500">ERC-20, BEP-20, Solana, TRC-20 &amp; more</p>
                </div>
                <span className={`material-symbols-outlined ml-3 text-slate-400 transition-transform duration-200 ${activeMethod === 'external' ? 'rotate-90 text-primary' : ''}`}>chevron_right</span>
              </button>

              {activeMethod === 'external' && (
                <div className="px-5 pb-5 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">

                  {/* Wallet address */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Recipient Wallet Address</label>
                    <div className="relative">
                      <input
                        value={walletAddress}
                        onChange={e => setWalletAddress(e.target.value)}
                        placeholder="Paste or scan address"
                        className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400 placeholder:font-sans"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                        <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                      </button>
                    </div>
                  </div>

                  {/* Network selector — triggers bottom sheet */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Select Network</label>
                    <button
                      onClick={() => setShowNetworkPicker(true)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-all active:scale-[0.99]"
                    >
                      {selectedNetwork ? (
                        <div className="flex items-center gap-3">
                          <div className="size-7 rounded-full overflow-hidden bg-white border border-slate-100 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img alt={selectedNetwork.label} src={selectedNetwork.icon} className="size-5 object-contain" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedNetwork.label}</p>
                            <p className="text-xs text-slate-400">{selectedNetwork.sub}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400 font-medium">e.g. ERC-20, BEP-20, Solana</span>
                      )}
                      <span className="material-symbols-outlined text-slate-400">expand_more</span>
                    </button>
                  </div>

                  {/* Warning */}
                  <div className="flex gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-3">
                    <span className="material-symbols-outlined text-amber-500 shrink-0 text-base mt-0.5">warning</span>
                    <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                      Ensure the selected network matches the recipient&apos;s wallet. Sending to the wrong network may result in <strong>permanent loss of funds</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => router.push(`/transfer/send-crypto/crypto-amount?name=External%20Wallet&handle=${encodeURIComponent(walletAddress)}&avatar=`)}
                    disabled={!canProceedExternal}
                    className="w-full mt-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Recent Recipients ── */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Recent Recipients</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {RECENT.map(({ name, img }) => (
              <div
                key={name}
                onClick={() => router.push(`/transfer/send-crypto/crypto-amount?name=${encodeURIComponent(name)}&handle=${encodeURIComponent(name)}&avatar=${encodeURIComponent(img)}`)}
                className="flex flex-col items-center space-y-2 shrink-0 w-20 cursor-pointer"
              >
                <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-transparent hover:border-primary transition-all relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={name} className="w-full h-full object-cover" src={img} />
                </div>
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center truncate w-full">{name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Network Picker Bottom Sheet ── */}
      {showNetworkPicker && (
        <div
          className="fixed inset-0 z-[80] flex flex-col justify-end"
          onClick={() => setShowNetworkPicker(false)}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div
            className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="font-display text-lg font-bold text-primary dark:text-white">Select Network</h2>
              <button
                onClick={() => setShowNetworkPicker(false)}
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>
            <div className="px-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {NETWORKS.map(network => (
                <button
                  key={network.id}
                  onClick={() => { setSelectedNetwork(network); setShowNetworkPicker(false) }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${selectedNetwork?.id === network.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'
                    }`}
                >
                  <div className="size-11 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center border border-slate-100 dark:border-slate-600 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={network.label} className="size-6 object-contain" src={network.icon} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{network.label}</p>
                    <p className="text-xs text-slate-500">{network.sub}</p>
                  </div>
                  {selectedNetwork?.id === network.id && (
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
