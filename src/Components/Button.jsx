import { motion } from "framer-motion";


const Button = ({ text, color, onClick, disabled, loading, add = false }) => {
  {
    /* Loading Button 
    
    
    : loading ? (
        <div className="flex flex-col">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            className={` border-CTA border border-solid relative py-[23px] px-[20px] text-white bg-CTA rounded-[10px] H-16 font-bold text-center  transition-colors duration-300 ${
              disabled ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={disabled ? null : onClick}
            disabled={disabled}
          >
            need to add new loading
          </motion.button>
        </div>
      )*/
  }
  return (
    <>
      {color === "white" ? (
        <div className="flex flex-col">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="relative  bg-white text-CTA border-CTA border border-solid rounded-[10px] hover:bg-opacity-80 H-16 font-bold"
            onClick={disabled ? null : onClick}
            disabled={disabled}
          >
            <motion.div
              whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              className="py-[10px] px-[10px] duration-50 text-nowrap flex items-center justify-center gap-[5px]"
            >
              {add && <p className="text-[26px]">+</p>}
              {text}
            </motion.div>
          </motion.button>
        </div>
      )  : (
        <div className="flex flex-col">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className={`relative  text-white bg-CTA rounded-[10px] H-16 font-bold text-center border-CTA border border-solid transition-colors duration-300 ${
              disabled ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={disabled ? null : onClick}
            disabled={disabled}
          >
            <motion.div
              whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              className="py-[10px] px-[10px] duration-50 text-nowrap flex items-center justify-center gap-[5px]"
            >
              {add && <p className="text-[26px]">+</p>}
              {loading ? "Loading.." : text}
            </motion.div>
          </motion.button>
        </div>
      )}
    </>
  );
};

export default Button;
