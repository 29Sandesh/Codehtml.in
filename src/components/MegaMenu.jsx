import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MegaMenu = ({ columns, baseRoute, width, onClose }) => {
  // Determine columns class based on columns.length
  const gridCols = columns.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 
                   columns.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' : 
                   'grid-cols-3 max-w-7xl mx-auto';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl z-50 text-left"
    >
      <div className={`grid gap-8 sm:gap-12 px-6 sm:px-12 py-10 mx-auto ${gridCols}`}>
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            <span className="font-body font-bold text-vintage-gold text-[10px] tracking-widest uppercase border-b border-white/5 pb-2.5">
              {column.title}
            </span>
            <div className="grid grid-cols-1 gap-3">
              {column.items.map((item) => (
                <Link
                  key={item.slug}
                  to={baseRoute ? `${baseRoute}/${item.slug}` : item.slug}
                  onClick={onClose}
                  className="py-1.5 group flex flex-col hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors duration-200"
                >
                  <span className="font-headline font-extrabold text-sm text-white group-hover:text-vintage-gold transition-colors leading-snug">
                    {item.name}
                  </span>
                  {item.desc && (
                    <span className="font-body text-zinc-500 text-[10px] mt-0.5 leading-normal group-hover:text-zinc-400 transition-colors">
                      {item.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MegaMenu;
