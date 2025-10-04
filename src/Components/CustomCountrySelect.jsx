import { useEffect, useRef, useState } from "react";
const CustomCountrySelect = ({
  countryCode,
  getCountry,
  disabled,
  login = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const countries = [
    { code: "91", display: "+91" },
    { code: "1", display: "+1" },
    { code: "44", display: "+44" },
    { code: "49", display: "+49" },
    { code: "33", display: "+33" },
    { code: "39", display: "+39" },
    { code: "34", display: "+34" },
    { code: "81", display: "+81" },
    { code: "86", display: "+86" },
    { code: "61", display: "+61" },
    { code: "64", display: "+64" },
    { code: "971", display: "+971" },
    { code: "977", display: "+977" },
    { code: "7", display: "+7" },
    { code: "52", display: "+52" },
    { code: "55", display: "+55" },
    { code: "27", display: "+27" },
    { code: "82", display: "+82" },
    { code: "66", display: "+66" },
    { code: "90", display: "+90" },
    { code: "46", display: "+46" },
    { code: "93", display: "+93" },
    { code: "355", display: "+355" },
    { code: "213", display: "+213" },
    { code: "376", display: "+376" },
    { code: "244", display: "+244" },
    { code: "268", display: "+268" },
    { code: "54", display: "+54" },
    { code: "374", display: "+374" },
    { code: "43", display: "+43" },
    { code: "994", display: "+994" },
    { code: "242", display: "+242" },
    { code: "973", display: "+973" },
    { code: "880", display: "+880" },
    { code: "246", display: "+246" },
    { code: "375", display: "+375" },
    { code: "32", display: "+32" },
    { code: "501", display: "+501" },
    { code: "229", display: "+229" },
    { code: "975", display: "+975" },
    { code: "591", display: "+591" },
    { code: "387", display: "+387" },
    { code: "267", display: "+267" },
    { code: "673", display: "+673" },
    { code: "359", display: "+359" },
    { code: "226", display: "+226" },
    { code: "257", display: "+257" },
    { code: "238", display: "+238" },
    { code: "855", display: "+855" },
    { code: "237", display: "+237" },
    { code: "236", display: "+236" },
    { code: "235", display: "+235" },
    { code: "56", display: "+56" },
    { code: "57", display: "+57" },
    { code: "269", display: "+269" },
    { code: "243", display: "+243" },
    { code: "506", display: "+506" },
    { code: "385", display: "+385" },
    { code: "53", display: "+53" },
    { code: "357", display: "+357" },
    { code: "420", display: "+420" },
    { code: "45", display: "+45" },
    { code: "253", display: "+253" },
    { code: "767", display: "+767" },
    { code: "809", display: "+809" },
    { code: "593", display: "+593" },
    { code: "20", display: "+20" },
    { code: "503", display: "+503" },
    { code: "240", display: "+240" },
    { code: "291", display: "+291" },
    { code: "372", display: "+372" },
    { code: "251", display: "+251" },
    { code: "679", display: "+679" },
    { code: "358", display: "+358" },
    { code: "241", display: "+241" },
    { code: "220", display: "+220" },
    { code: "995", display: "+995" },
    { code: "233", display: "+233" },
    { code: "30", display: "+30" },
    { code: "473", display: "+473" },
    { code: "502", display: "+502" },
    { code: "224", display: "+224" },
    { code: "245", display: "+245" },
    { code: "592", display: "+592" },
    { code: "509", display: "+509" },
    { code: "504", display: "+504" },
    { code: "36", display: "+36" },
    { code: "354", display: "+354" },
    { code: "62", display: "+62" },
    { code: "98", display: "+98" },
    { code: "964", display: "+964" },
    { code: "353", display: "+353" },
    { code: "972", display: "+972" },
    { code: "876", display: "+876" },
    { code: "962", display: "+962" },
    { code: "254", display: "+254" },
    { code: "686", display: "+686" },
    { code: "965", display: "+965" },
    { code: "996", display: "+996" },
    { code: "856", display: "+856" },
    { code: "371", display: "+371" },
    { code: "961", display: "+961" },
    { code: "266", display: "+266" },
    { code: "231", display: "+231" },
    { code: "218", display: "+218" },
    { code: "423", display: "+423" },
    { code: "370", display: "+370" },
    { code: "352", display: "+352" },
    { code: "261", display: "+261" },
    { code: "265", display: "+265" },
    { code: "60", display: "+60" },
    { code: "960", display: "+960" },
    { code: "223", display: "+223" },
    { code: "356", display: "+356" },
    { code: "692", display: "+692" },
    { code: "222", display: "+222" },
    { code: "230", display: "+230" },
    { code: "691", display: "+691" },
    { code: "373", display: "+373" },
    { code: "377", display: "+377" },
    { code: "976", display: "+976" },
    { code: "382", display: "+382" },
    { code: "212", display: "+212" },
    { code: "258", display: "+258" },
    { code: "95", display: "+95" },
    { code: "264", display: "+264" },
    { code: "674", display: "+674" },
    { code: "31", display: "+31" },
    { code: "505", display: "+505" },
    { code: "227", display: "+227" },
    { code: "234", display: "+234" },
    { code: "850", display: "+850" },
    { code: "389", display: "+389" },
    { code: "47", display: "+47" },
    { code: "968", display: "+968" },
    { code: "92", display: "+92" },
    { code: "680", display: "+680" },
    { code: "507", display: "+507" },
    { code: "675", display: "+675" },
    { code: "595", display: "+595" },
    { code: "51", display: "+51" },
    { code: "63", display: "+63" },
    { code: "48", display: "+48" },
    { code: "351", display: "+351" },
    { code: "974", display: "+974" },
    { code: "40", display: "+40" },
    { code: "250", display: "+250" },
    { code: "869", display: "+869" },
    { code: "758", display: "+758" },
    { code: "784", display: "+784" },
    { code: "685", display: "+685" },
    { code: "378", display: "+378" },
    { code: "239", display: "+239" },
    { code: "966", display: "+966" },
    { code: "221", display: "+221" },
    { code: "381", display: "+381" },
    { code: "248", display: "+248" },
    { code: "232", display: "+232" },
    { code: "65", display: "+65" },
    { code: "421", display: "+421" },
    { code: "386", display: "+386" },
    { code: "677", display: "+677" },
    { code: "252", display: "+252" },
    { code: "211", display: "+211" },
    { code: "94", display: "+94" },
    { code: "249", display: "+249" },
    { code: "597", display: "+597" },
    { code: "41", display: "+41" },
    { code: "963", display: "+963" },
    { code: "886", display: "+886" },
    { code: "992", display: "+992" },
    { code: "255", display: "+255" },
    { code: "670", display: "+670" },
    { code: "228", display: "+228" },
    { code: "676", display: "+676" },
    { code: "868", display: "+868" },
    { code: "216", display: "+216" },
    { code: "993", display: "+993" },
    { code: "688", display: "+688" },
    { code: "256", display: "+256" },
    { code: "380", display: "+380" },
    { code: "598", display: "+598" },
    { code: "998", display: "+998" },
    { code: "678", display: "+678" },
    { code: "379", display: "+379" },
    { code: "58", display: "+58" },
    { code: "84", display: "+84" },
    { code: "967", display: "+967" },
    { code: "260", display: "+260" },
    { code: "263", display: "+263" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    getCountry(Number(code));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`mr-2   rounded-l-[10px] ${
          login ? "p-[18px] smallShadow " : "p-[15px] border border-gray-300"
        } focus:outline-none focus:ring-CTA focus:border-CTA appearance-none w-full text-left bg-white flex items-center justify-between`}
      >
        <span>+{countryCode === "" ? "91" : countryCode}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-white border border-Used-300 rounded-[10px] mt-1 max-h-[150px] sm:max-h-[230px] md:max-h-[300px] lg:max-h-[350px] overflow-auto shadow-lg">
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleSelect(country.code)}
              className="px-[15px] py-2 hover:bg-gray-100 cursor-pointer text-left"
            >
              {country.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCountrySelect;
