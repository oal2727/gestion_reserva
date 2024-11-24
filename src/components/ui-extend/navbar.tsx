import Link from "next/link";
const Navbar = () => {
return (
    <div className="bg-card py-3 px-4 border-0 flex
    items-center w-full
    border-b-2 shadow-md
    justify-between gap-6">

    <ul className="hidden md:flex items-center gap-10
    text-card-foreground">
        <li className="text-primary font-medium">
            <Link href="/">Inicio</Link>
        </li>
        <li className="text-primary font-medium">
            <Link href="/reserva-registro">Fomrulario de Reserva</Link>
        </li>
        <li>
            <Link href="/listado-registro">Listado de Reservas</Link>
        </li>
    </ul>
    </div>
);
};
export default Navbar