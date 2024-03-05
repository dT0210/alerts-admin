import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("Please provide a valid input.");
    }

    return (
        <div className="h-full w-ful">
            <div className="h-full pt-20">
                <div className="text-center text-5xl font-semibold mb-20">LOGIN</div>
                <form onSubmit={handleSubmitEvent} className="">
                    <div className="w-[220px] mx-auto">
                        <label htmlFor="username" className="block">Username</label>
                        <input type="text" id="username" name="username" 
                            className="border-2 border-black rounded-lg w-full p-1" 
                            placeholder="Enter your username..."
                            required
                            onChange={handleInput}
                        />
                    </div>
                    <div className="w-[220px] mx-auto mt-4">
                        <label htmlFor="password" className="block">Password</label>
                        <input type="password" id="password" name="password" 
                            className="border-2 border-black rounded-lg w-full p-1" 
                            placeholder="Enter your password..."
                            required
                            onChange={handleInput}
                        />
                    </div>
                    <div id="login-error" className="text-red-600 text-center">

                    </div>
                    <button className="block w-[120px] mx-auto bg-[#54A1CC] text-white rounded-md py-2 mt-20">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;