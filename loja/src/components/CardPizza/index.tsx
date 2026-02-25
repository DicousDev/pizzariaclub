import { ShoppingCart } from "lucide-react";
import { formatReal } from "../../formatter";

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
        <div className="shadow-lg bg-white w-full rounded-lg flex flex-col items-center pb-5">
            <div style={{ backgroundImage: `url(${img})` }} className=" w-full h-36 bg-cover bg-no-repeat bg-center"></div>
            <div className="px-3 text-lg pt-2 h-52 ">
                <div className="text-orange-500 font-bold text-xl">{formatReal.format(Number(preco))}</div>
                <p className="text-gray-700 font-bold text-base">{titulo}</p>
                <p className="text-gray-400 text-sm text-justify py-3">{descricao}</p>
            </div>
            <div className="px-3 w-full">
                <button onClick={() => onAdicionarPizza(id)} className="bg-orange-500 w-full p-3 gap-3 flex items-center justify-center rounded-xl text-white font-bold hover:bg-orange-700 hover:cursor-pointer hover:duration-300">
                    <ShoppingCart className="text-white" />
                    Adicionar
                </button>
            </div>
        </div>
    );
}