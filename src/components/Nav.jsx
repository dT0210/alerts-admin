import Logo from "../assets/Logo1.png"
import { useAuth } from "../auth/AuthProvider"

function Nav() {
    const handleUserClick = () => {
        const userOptions = document.getElementById("userOptions");
        userOptions.classList.toggle('hidden');
    }
    const auth = useAuth();
    const handleLogout = (e) => {
        auth.logout();
    }

    return (
        <nav className="h-[100px] bg-[#54A1CC] flex justify-between items-center px-2 relative">
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className="text-white font-medium text-3xl">
                DASHBOARD
            </div>
            <div>
                <button onClick={handleUserClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div id="userOptions" className="absolute right-0 top-[100px] bg-[#ABCDFF] hidden p-2">
                <a href="" className="block hover:underline">User info</a>
                <button href="" onClick={handleLogout} className="hover:underline">Logout</button>
            </div>
        </nav>
    );
}

export default Nav;