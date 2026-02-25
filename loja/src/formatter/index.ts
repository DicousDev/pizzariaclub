export  const formatReal = new Intl.NumberFormat("BRL", {style: "currency", currency: "BRL"})

export const manterApenasNumeros = (text: string) => {
    if (!text) return "";

    return text.replace(/\D/g, "");
}