import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex px-4 md:px-12 py-4 text-zinc-400 font-body font-semibold tracking-tight text-[10px] md:text-xs bg-black sticky top-[76px] z-40 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-zinc-800">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="hover:text-vintage-gold transition-colors opacity-80">HOME</Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <li key={to} className="flex items-center space-x-2">
                            <span className="text-zinc-600">➲</span>
                            {last ? (
                                <span className="text-vintage-gold">{value.replace(/-/g, ' ')}</span>
                            ) : (
                                <Link to={to} className="hover:text-vintage-gold transition-colors">
                                    {value.replace(/-/g, ' ')}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
