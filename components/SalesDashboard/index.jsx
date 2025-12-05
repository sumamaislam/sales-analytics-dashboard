import React, { useEffect, useState, memo, useCallback } from 'react'
import LineBar from './lineBar'
import Efficiency from './agentEfficiency'
import TotalQuotes from './totalQuotes'
import TotalInvoices from './totalInvoices'
import WorkOrders from './workOrders'
import ProductAnalytics from './productAnalytics'
import TopAgent from './topAgent'
import RatioDesign from './ratioDesign'
import CadRequest from './cadRequest'
import SalesMarquee from './salesMarquee'
import { useSalesAnalytics } from '../socket/useSocketData'


const SalesDashboard = memo(function SalesDashboard({currentIndex ,setCurrentIndex ,userNames ,setUserNames}) {
    const { data: salesData, loading, error } = useSalesAnalytics()
    console.log(salesData, "salesData");
    const [joiningDate, setJoiningDate] = useState([]);

    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [userNames, setUserNames] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [blur, setBlur] = useState(0);
    const [voiceSettings, setVoiceSettings] = useState({
        rate: 0.6,
        pitch: 0.8,
        volume: 0.8,
        voiceType: 'auto' // 'male', 'female', 'auto'
    });

    // Memoize userNames to prevent unnecessary re-renders
    useEffect(() => {
        if (salesData?.data?.salesAnalyticsUserWise) {
            const names = Object.values(salesData.data.salesAnalyticsUserWise).map((item) => item?.userInfo?.name);
            setUserNames(names);
            
        }
    }, [salesData?.data?.salesAnalyticsUserWise]);

    useEffect(() => {
        if (salesData?.data?.salesAnalyticsUserWise) {
            const joiningDates = Object.values(salesData.data.salesAnalyticsUserWise).map((item) => item?.userInfo?.joining);
            setJoiningDate(joiningDates);
        }
    }, [salesData?.data?.salesAnalyticsUserWise]);
    // Load voices when component mounts
    // useEffect(() => {
    //     if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    //         const loadVoices = () => {
    //             const voices = speechSynthesis.getVoices();
    //             if (voices.length > 0) {
    //                 console.log('Available voices:', voices.map(v => v.name));
    //             }
    //         };
            
    //         // Load voices immediately
    //         loadVoices();
            
    //         // Also load when voices change
    //         speechSynthesis.addEventListener('voiceschanged', loadVoices);
            
    //         return () => {
    //             speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    //         };
    //     }
    // }, []);
    
    // useEffect(() => {
    //     if (userNames.length > 0) {
    //         const interval = setInterval(() => {
    //             // Start blur out animation
    //             setIsAnimating(true);
    //             setBlur(10);
    //             setOpacity(0.3);
                
    //             // After blur out completes, change index and blur in
    //             setTimeout(() => {
    //                 setCurrentIndex((prev) => (prev + 1) % userNames.length);
    //                 setBlur(0);
    //                 setOpacity(1);
                    
    //                 // Reset animation state after blur in completes
    //                 setTimeout(() => {
    //                     setIsAnimating(false);
    //                 }, 2500);
    //             }, 2500);
    //         }, 40000);
    //         return () => clearInterval(interval);
    //     }
    // }, [userNames.length]);

    // Text-to-speech function with professional office voice
    // const speakName = useCallback((name) => {
    //     if (typeof window !== 'undefined' && 'speechSynthesis' in window && name && !isMuted) {
    //         // Stop any ongoing speech
    //         speechSynthesis.cancel();
             
    //         const utterance = new SpeechSynthesisUtterance(name);
    //         utterance.rate = voiceSettings.rate; // Customizable rate
    //         utterance.pitch = voiceSettings.pitch; // Customizable pitch
    //         utterance.volume = voiceSettings.volume; // Customizable volume
             
    //         // Get all available voices
    //         const voices = speechSynthesis.getVoices();
             
    //         // Priority order for professional office voices
    //         const professionalVoices = [
    //             // Male Voices (Deep, Professional)
    //             'Microsoft David Desktop - English (United States)',
    //             'Google UK English Male',
    //             'Google US English Male',
    //             'Daniel',
    //             'Tom',
    //             'Mark',
                 
    //             // Female Voices (Clear, Professional)
    //             'Microsoft Zira Desktop - English (United States)',
    //             'Microsoft Susan Desktop - English (United States)',
    //             'Google UK English Female',
    //             'Google US English Female',
    //             'Samantha',
    //             'Victoria',
    //             'Alex',
    //             'Moira',
    //             'Tessa',
                 
    //             // International Voices
    //             'Microsoft Hazel Desktop - English (Great Britain)',
    //             'Microsoft Catherine Desktop - English (Australia)',
    //             'Google Hindi Female',
    //             'Google Hindi Male'
    //         ];
             
    //         // Find the best professional voice
    //         let selectedVoice = null;
    //         for (const voiceName of professionalVoices) {
    //             selectedVoice = voices.find(voice => voice.name === voiceName);
    //             if (selectedVoice) break;
    //         }
             
    //         // Fallback to any English voice
    //         if (!selectedVoice) {
    //             selectedVoice = voices.find(voice => 
    //                 voice.lang.startsWith('en') && 
    //                 (voice.name.includes('Google Hindi Female') || voice.name.includes('Google Hindi Female'))
    //             );
    //         }
             
    //         if (selectedVoice) {
    //             utterance.voice = selectedVoice;
    //         }
             
    //         // Add professional announcement style
    //         const professionalText = `${name}`;
    //         utterance.text = professionalText;
             
    //         speechSynthesis.speak(utterance);
    //     }
    // }, [isMuted, voiceSettings]);

    // Toggle mute function
    // const toggleMute = () => {
    //     setIsMuted(!isMuted);
    //     if (!isMuted) {
    //         speechSynthesis.cancel();
    //     }
    // };

    // Speak name when currentIndex changes
    // useEffect(() => {
    //     if (userNames.length > 0 && userNames[currentIndex] && !isMuted) {
    //         // Small delay to ensure smooth transition
    //         const timer = setTimeout(() => {
    //             speakName(userNames[currentIndex]);
    //         }, 500);
            
    //         return () => clearTimeout(timer);
    //     }
    // }, [currentIndex, userNames, speakName, isMuted]);

    return (
        <>
            <div 
                className='w-[100%] 2xl:h-[72vh] flex xl-plus:gap-[20px] 2xl:gap-[20px] gap-[10px] xl-plus:mt-[69px] mt-[30px] transition-all duration-500 ease-in-out'
               
            >
                <div className='w-[75%] bg-background-secondary xl-plus:rounded-[64px] rounded-[30px] xl-plus:px-[50px] px-[20px] xl-plus:py-[36px] py-[20px]'>
                    <div className='flex justify-between items-center xl-plus:gap-10 gap-5 xl-plus:mb-8 mb-4'>
                        <div className='flex items-center xl-plus:gap-10 gap-5'>
                            <h2 className='xl-plus:text-[44px] 2xl:text-[24px] text-[18px] text-foreground'>Agent Overview </h2>
                            <img className='w-[20px] xl-plus:w-[35px] h-auto' src="/images/salesDashboard/right_arrow_white.png" alt="arrow icon" />
                          
                                    <h2
                                        key={currentIndex}
                                        className="xl-plus:text-[44px] 2xl:text-[24px] text-[18px] text-foreground transition-opacity duration-300"
                                    >
                                        {userNames[currentIndex] || "Loading..."}
                                    </h2>
                              
                            <p className='bg-[white]/50 xl-plus:text-[32px] 2xl:text-[16px] text-[12px] px-5 py-1 xl-plus:rounded-[21px] rounded-[10px] text-foreground'>Since {joiningDate[currentIndex]}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* <button
                                onClick={toggleMute}
                                className={`p-2 rounded-full transition-colors ${
                                    isMuted 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-green-500 hover:bg-green-600'
                                }`}
                                title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
                            >
                                {isMuted ? (
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L5.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h3.5l2.883-3.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L5.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h3.5l2.883-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button> */}
                            <img className='w-[40px] xl-plus:w-[85px] h-auto' src="/images/salesDashboard/one_prem.svg" alt="one icon" />
                        </div>
                    </div>

                    {/* Sales Analytics Chart */}
                    <div className='w-[100%] flex xl-plus:gap-[15px] gap-[10px]'>
                        <div className='w-[100%]'>
                            <LineBar currentUserIndex={currentIndex} />
                        </div>
                        <div className='w-[100%] flex xl-plus:gap-[15px] gap-[10px]'>

                            <div className='  w-[100%] '>
                                <div className='w-[100%]'>
                                    <Efficiency />
                                </div>
                                <div className='w-[100%] xl-plus:mt-[15px] mt-[10px]'>
                                    <TotalQuotes currentUserIndex={currentIndex} />
                                </div>
                            </div>
                            <div className=' flex w-[100%] gap-[15px]  '>
                                <div className='w-[100%] '>
                                    <TotalInvoices currentUserIndex={currentIndex} />
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='w-[100%] flex gap-[15px] xl-plus:mt-[15px] mt-[10px]'>
                        <div className='w-[100%]'>
                            <div>
                                <WorkOrders currentUserIndex={currentIndex} />
                            </div>
                            <div className='w-[100%] flex xl-plus:gap-[15px] gap-[10px]'>
                                <div className='w-[100%] h-[100%]'>
                                    <ProductAnalytics currentUserIndex={currentIndex} />
                                </div>
                                <div className='w-[100%] h-[100%]'>
                                    <RatioDesign currentUserIndex={currentIndex} />
                                </div>
                            </div>
                        </div>




                        <div className='w-[100%] '>

                            <CadRequest currentUserIndex={currentIndex} />

                        </div>

                    </div>



                </div>

                <div className='w-[25%]  bg-background-secondary xl-plus:rounded-[64px] rounded-[30px]'>

                    <TopAgent currentUserIndex={currentIndex} />
                </div>

            </div>

        </>
    )
})

export default SalesDashboard
