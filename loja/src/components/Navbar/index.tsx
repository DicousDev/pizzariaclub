import { Pizza } from "lucide-react";

interface NavbarProps {
    children?: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
    return (
        <nav className="sticky top-0 bg-orange-500 py-5 px-10 text-white flex items-center justify-between ">
            <div>
                <p className="text-2xl font-bold flex items-center justify-center"><Pizza size="30" className="mr-3" /> Pizzaria<span className="text-2xl">Club</span></p>
                <p className="text-gray-100 text-sm">A pizza mais pedida da região!</p>
            </div>
            { children }
        </nav>
    );
}