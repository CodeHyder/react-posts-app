import { useUser } from "../context/UserContext";
import Button from "./Button";


export default function Header() {
    const { logout } = useUser();

    return (
            <header className="bg-[#7695EC] h-[80px] w-full flex items-center justify-between px-6 text-white text-2xl font-bold">
                CodeLeap Network
                <Button
                    onClick={logout}
                    variant="danger"
                >
                    Logout
                </Button>
            </header>
    )
}