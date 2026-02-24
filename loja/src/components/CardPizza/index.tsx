import { ShoppingCart } from "lucide-react";

interface CardPizzaProps {
    id: string;
    img: string;
    titulo: string;
    descricao: string;
    preco: string;
    onAdicionarPizza: (id: string) => void;
}

export const CardPizza = ({ id, img, titulo, descricao, preco, onAdicionarPizza }: CardPizzaProps) => {
    return (
        <div className="shadow-lg bg-white w-96 pb-5 rounded-lg">
            <div style={{ backgroundImage: `url(${img})` }} className="w-full h-40 bg-cover bg-no-repeat bg-center"></div>
            <div className="px-3 text-lg pt-2">
                <div className="text-orange-500 font-bold text-xl">{preco}</div>
                <p className="text-gray-700 font-bold">{titulo}</p>
                <p className="text-gray-400 text-sm text-justify py-3">{descricao}</p>
                
                <button onClick={() => onAdicionarPizza(id)} className="bg-orange-500 w-full flex items-center justify-center gap-5 p-3 rounded-xl text-white font-bold hover:bg-orange-700 hover:cursor-pointer hover:duration-300">
                    <ShoppingCart className="text-white" />
                    Adicionar
                </button>
            </div>
        </div>
    );
}